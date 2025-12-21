import {
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  effect,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Monaco Editor types (will be loaded dynamically)
declare const monaco: any;

@Component({
  selector: 'app-code-editor',
  imports: [],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.scss',
})
export class CodeEditor implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  // Inputs
  value = input<string>('');
  language = input<string>('typescript');
  theme = input<string>('vs-dark');
  readOnly = input<boolean>(false);
  height = input<string>('400px');

  // Outputs
  valueChange = output<string>();

  // Private properties
  private editor: any;
  private platformId = inject(PLATFORM_ID);
  private monacoLoaded = false;

  constructor() {
    // Watch for value changes from parent
    effect(() => {
      const newValue = this.value();
      if (this.editor && this.editor.getValue() !== newValue) {
        this.editor.setValue(newValue);
      }
    });
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.loadMonaco();
      this.initEditor();
    }
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private async loadMonaco() {
    if (this.monacoLoaded || typeof monaco !== 'undefined') {
      this.monacoLoaded = true;
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');

      // Try local assets first, fallback to CDN
      const tryLoadFromSource = (src: string, paths: string, isCDN: boolean = false) => {
        script.src = src;
        script.onload = () => {
          (window as any).require.config({
            paths: { vs: paths },
          });
          (window as any).require(['vs/editor/editor.main'], () => {
            this.monacoLoaded = true;
            resolve();
          });
        };
        script.onerror = () => {
          if (!isCDN) {
            // If local fails, try CDN
            console.log('Monaco local assets not found, loading from CDN...');
            document.body.removeChild(script);
            const cdnScript = document.createElement('script');
            tryLoadFromSource.call(
              this,
              'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.55.1/min/vs/loader.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.55.1/min/vs',
              true
            );
            document.body.appendChild(cdnScript);
          } else {
            reject(new Error('Failed to load Monaco Editor'));
          }
        };
      };

      tryLoadFromSource('assets/monaco-editor/min/vs/loader.js', 'assets/monaco-editor/min/vs');
      document.body.appendChild(script);
    });
  }

  private initEditor() {
    if (!this.monacoLoaded) return;

    // Configure TypeScript compiler options for better IntelliSense
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowNonTsExtensions: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      lib: ['es2020', 'dom'],
      strict: false,
      skipLibCheck: true,
    });

    // Add comprehensive Angular type definitions
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      declare module '@angular/core' {
        export interface Type<T> extends Function { }
        export interface ModuleWithProviders<T> { }

        // Decorators (as functions)
        export function Component(obj: {
          selector?: string;
          template?: string;
          templateUrl?: string;
          styles?: string[];
          styleUrls?: string[];
          changeDetection?: ChangeDetectionStrategy;
          [key: string]: any;
        }): ClassDecorator;

        export function NgModule(obj: any): ClassDecorator;
        export function Injectable(obj?: any): ClassDecorator;
        export function Directive(obj: any): ClassDecorator;
        export function Pipe(obj: any): ClassDecorator;
        export function Input(bindingPropertyName?: string): PropertyDecorator;
        export function Output(bindingPropertyName?: string): PropertyDecorator;
        export function HostListener(eventName: string, args?: string[]): MethodDecorator;
        export function ViewChild(selector: any, opts?: any): PropertyDecorator;
        export function ContentChild(selector: any, opts?: any): PropertyDecorator;
        export function HostBinding(hostPropertyName?: string): PropertyDecorator;

        // Lifecycle hook interfaces
        export interface OnInit {
          ngOnInit(): void;
        }
        export interface OnDestroy {
          ngOnDestroy(): void;
        }
        export interface OnChanges {
          ngOnChanges(changes: any): void;
        }
        export interface DoCheck {
          ngDoCheck(): void;
        }
        export interface AfterContentInit {
          ngAfterContentInit(): void;
        }
        export interface AfterContentChecked {
          ngAfterContentChecked(): void;
        }
        export interface AfterViewInit {
          ngAfterViewInit(): void;
        }
        export interface AfterViewChecked {
          ngAfterViewChecked(): void;
        }

        export class EventEmitter<T> {
          emit(value?: T): void;
          subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): any;
        }

        export class ElementRef<T = any> {
          nativeElement: T;
        }

        export class TemplateRef<C> { }
        export class ViewContainerRef { }

        export class ChangeDetectorRef {
          markForCheck(): void;
          detach(): void;
          detectChanges(): void;
          checkNoChanges(): void;
          reattach(): void;
        }

        export enum ChangeDetectionStrategy {
          OnPush = 0,
          Default = 1
        }

        export class Injector {
          get<T>(token: any): T;
        }

        export class Renderer2 { }
        export class ApplicationRef { }
      }

      declare module '@angular/common' {
        export class NgIf { }
        export class NgFor { }
        export class NgForOf { }
        export class NgSwitch { }
        export class NgClass { }
        export class NgStyle { }
        export class AsyncPipe { }
        export class DatePipe { }
        export class CommonModule { }
      }

      declare module '@angular/forms' {
        export class FormControl {
          constructor(value?: any, validators?: any, asyncValidators?: any);
          value: any;
          setValue(value: any): void;
          patchValue(value: any): void;
        }

        export class FormGroup {
          constructor(controls: any, validators?: any, asyncValidators?: any);
          value: any;
          controls: any;
          get(path: string): any;
          setValue(value: any): void;
          patchValue(value: any): void;
        }

        export class FormBuilder {
          group(controls: any): FormGroup;
          control(value: any, validators?: any): FormControl;
          array(controls: any[]): FormArray;
        }

        export class FormArray {
          controls: any[];
          push(control: any): void;
        }

        export class Validators {
          static required(control: any): any;
          static email(control: any): any;
          static minLength(length: number): any;
          static maxLength(length: number): any;
          static pattern(pattern: string | RegExp): any;
        }

        export class FormsModule { }
        export class ReactiveFormsModule { }
      }

      declare module '@angular/router' {
        export class Router {
          navigate(commands: any[], extras?: any): Promise<boolean>;
          navigateByUrl(url: string): Promise<boolean>;
        }

        export class ActivatedRoute {
          params: any;
          queryParams: any;
          snapshot: any;
        }

        export class RouterModule { }
      }

      declare module 'rxjs' {
        export class Observable<T> {
          subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
          pipe(...operations: any[]): Observable<any>;
        }

        export class Subject<T> extends Observable<T> {
          next(value: T): void;
          error(err: any): void;
          complete(): void;
        }

        export class BehaviorSubject<T> extends Subject<T> {
          constructor(value: T);
          value: T;
          getValue(): T;
        }

        export class ReplaySubject<T> extends Subject<T> {
          constructor(bufferSize?: number);
        }

        export interface Subscription {
          unsubscribe(): void;
          add(teardown: any): void;
          remove(teardown: any): void;
        }

        export function of<T>(...values: T[]): Observable<T>;
        export function from<T>(input: any): Observable<T>;
        export function interval(period: number): Observable<number>;
        export function timer(delay: number, period?: number): Observable<number>;
        export function combineLatest<T>(...observables: Observable<any>[]): Observable<T[]>;
        export function merge<T>(...observables: Observable<T>[]): Observable<T>;
        export function forkJoin<T>(sources: Observable<any>[]): Observable<T[]>;
        export function throwError(error: any): Observable<never>;
      }

      declare module 'rxjs/operators' {
        import { Observable } from 'rxjs';

        export function map<T, R>(project: (value: T, index: number) => R): (source: Observable<T>) => Observable<R>;
        export function filter<T>(predicate: (value: T, index: number) => boolean): (source: Observable<T>) => Observable<T>;
        export function tap<T>(next: (value: T) => void): (source: Observable<T>) => Observable<T>;
        export function catchError<T>(selector: (err: any, caught: Observable<T>) => Observable<any>): (source: Observable<T>) => Observable<T>;
        export function switchMap<T, R>(project: (value: T, index: number) => Observable<R>): (source: Observable<T>) => Observable<R>;
        export function mergeMap<T, R>(project: (value: T, index: number) => Observable<R>): (source: Observable<T>) => Observable<R>;
        export function concatMap<T, R>(project: (value: T, index: number) => Observable<R>): (source: Observable<T>) => Observable<R>;
        export function debounceTime<T>(dueTime: number): (source: Observable<T>) => Observable<T>;
        export function distinctUntilChanged<T>(): (source: Observable<T>) => Observable<T>;
        export function takeUntil<T>(notifier: Observable<any>): (source: Observable<T>) => Observable<T>;
        export function take<T>(count: number): (source: Observable<T>) => Observable<T>;
        export function skip<T>(count: number): (source: Observable<T>) => Observable<T>;
        export function first<T>(): (source: Observable<T>) => Observable<T>;
        export function last<T>(): (source: Observable<T>) => Observable<T>;
        export function shareReplay<T>(config?: any): (source: Observable<T>) => Observable<T>;
        export function startWith<T>(...values: T[]): (source: Observable<T>) => Observable<T>;
        export function delay<T>(delay: number): (source: Observable<T>) => Observable<T>;
      }

      declare module '@angular/common/http' {
        import { Observable } from 'rxjs';

        export class HttpClient {
          get<T>(url: string, options?: any): Observable<T>;
          post<T>(url: string, body: any, options?: any): Observable<T>;
          put<T>(url: string, body: any, options?: any): Observable<T>;
          delete<T>(url: string, options?: any): Observable<T>;
          patch<T>(url: string, body: any, options?: any): Observable<T>;
        }

        export class HttpHeaders {
          constructor(headers?: any);
        }

        export class HttpParams {
          constructor(options?: any);
        }

        export class HttpClientModule { }

        export interface HttpErrorResponse {
          error: any;
          status: number;
          statusText: string;
        }
      }

      // TypeScript global types
      interface Array<T> {
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
        some(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        every(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        push(...items: T[]): number;
        pop(): T | undefined;
        shift(): T | undefined;
        unshift(...items: T[]): number;
        slice(start?: number, end?: number): T[];
        splice(start: number, deleteCount?: number, ...items: T[]): T[];
        length: number;
      }

      interface Promise<T> {
        then<TResult1 = T, TResult2 = never>(
          onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
          onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
        ): Promise<TResult1 | TResult2>;
        catch<TResult = never>(
          onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
        ): Promise<T | TResult>;
      }

      declare function setTimeout(handler: () => void, timeout?: number): number;
      declare function setInterval(handler: () => void, timeout?: number): number;
      declare function clearTimeout(handle: number): void;
      declare function clearInterval(handle: number): void;

      declare var console: {
        log(...data: any[]): void;
        error(...data: any[]): void;
        warn(...data: any[]): void;
        info(...data: any[]): void;
        debug(...data: any[]): void;
      };

      // Common TypeScript interfaces
      interface ClassDecorator {
        <TFunction extends Function>(target: TFunction): TFunction | void;
      }

      interface PropertyDecorator {
        (target: Object, propertyKey: string | symbol): void;
      }

      interface MethodDecorator {
        <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
      }

      interface TypedPropertyDescriptor<T> {
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        value?: T;
        get?: () => T;
        set?: (value: T) => void;
      }
    `,
      'ts:filename/angular-rxjs.d.ts'
    );

    // Create the editor
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.value(),
      language: this.language(),
      theme: this.theme(),
      readOnly: this.readOnly(),
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      suggest: {
        showKeywords: true,
        showSnippets: true,
      },
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false,
      },
      parameterHints: {
        enabled: true,
      },
      formatOnPaste: true,
      formatOnType: true,
      tabSize: 2,
    });

    // Listen for content changes
    this.editor.onDidChangeModelContent(() => {
      const currentValue = this.editor.getValue();
      this.valueChange.emit(currentValue);
    });
  }
}
