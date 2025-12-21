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

        export class Component {
          constructor(obj: any);
        }
        export class NgModule { }
        export class Injectable { }
        export class Directive { }
        export class Pipe { }

        export class Input { }
        export class Output { }
        export class HostListener { }
        export class ViewChild { }
        export class ContentChild { }
        export class HostBinding { }

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

        export function OnInit(): void;
        export function OnDestroy(): void;
        export function OnChanges(): void;
        export function DoCheck(): void;
        export function AfterContentInit(): void;
        export function AfterContentChecked(): void;
        export function AfterViewInit(): void;
        export function AfterViewChecked(): void;
      }

      declare module '@angular/common' {
        export class NgIf { }
        export class NgFor { }
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
        }

        export class ReplaySubject<T> extends Subject<T> {
          constructor(bufferSize?: number);
        }

        export interface Subscription {
          unsubscribe(): void;
        }

        export function of<T>(...values: T[]): Observable<T>;
        export function from<T>(input: any): Observable<T>;
        export function interval(period: number): Observable<number>;
        export function timer(delay: number, period?: number): Observable<number>;
        export function combineLatest<T>(...observables: Observable<any>[]): Observable<T[]>;
        export function merge<T>(...observables: Observable<T>[]): Observable<T>;
        export function forkJoin<T>(sources: Observable<any>[]): Observable<T[]>;
      }

      declare module 'rxjs/operators' {
        export function map<T, R>(project: (value: T) => R): any;
        export function filter<T>(predicate: (value: T) => boolean): any;
        export function tap<T>(next: (value: T) => void): any;
        export function catchError<T>(selector: (err: any) => Observable<T>): any;
        export function switchMap<T, R>(project: (value: T) => Observable<R>): any;
        export function mergeMap<T, R>(project: (value: T) => Observable<R>): any;
        export function concatMap<T, R>(project: (value: T) => Observable<R>): any;
        export function debounceTime<T>(dueTime: number): any;
        export function distinctUntilChanged<T>(): any;
        export function takeUntil<T>(notifier: Observable<any>): any;
        export function take<T>(count: number): any;
        export function skip<T>(count: number): any;
        export function first<T>(): any;
        export function last<T>(): any;
        export function shareReplay<T>(config?: any): any;
        export function startWith<T>(value: T): any;
        export function delay<T>(delay: number): any;
      }

      declare module '@angular/common/http' {
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
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
        filter(predicate: (value: T, index: number, array: T[]) => boolean): T[];
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
        find(predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined;
        some(predicate: (value: T, index: number, array: T[]) => boolean): boolean;
        every(predicate: (value: T, index: number, array: T[]) => boolean): boolean;
        push(...items: T[]): number;
        pop(): T | undefined;
        shift(): T | undefined;
        unshift(...items: T[]): number;
        length: number;
      }

      interface Promise<T> {
        then<TResult>(onfulfilled?: (value: T) => TResult | Promise<TResult>): Promise<TResult>;
        catch<TResult>(onrejected: (reason: any) => TResult | Promise<TResult>): Promise<TResult>;
      }

      declare function setTimeout(handler: () => void, timeout: number): number;
      declare function setInterval(handler: () => void, timeout: number): number;
      declare function clearTimeout(handle: number): void;
      declare function clearInterval(handle: number): void;

      declare const console: {
        log(...data: any[]): void;
        error(...data: any[]): void;
        warn(...data: any[]): void;
        info(...data: any[]): void;
      };
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
