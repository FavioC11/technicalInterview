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
    });

    // Add Angular type definitions (basic support)
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      declare module '@angular/core' {
        export class Component { }
        export class Injectable { }
        export class NgModule { }
        export class Input { }
        export class Output { }
        export class EventEmitter<T> { }
      }
    `,
      'angular.d.ts'
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
