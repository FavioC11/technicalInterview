import {
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  effect,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import sdk from '@stackblitz/sdk';

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
  height = input<string>('600px');

  // Outputs
  valueChange = output<string>();

  // Private properties
  private vm: any;

  constructor() {
    // Watch for value changes from parent
    effect(() => {
      const newValue = this.value();
      if (this.vm) {
        this.updateEditorContent(newValue);
      }
    });
  }

  async ngAfterViewInit() {
    await this.initStackBlitz();
  }

  ngOnDestroy() {
    // StackBlitz cleanup happens automatically
  }

  private async initStackBlitz() {
    const initialCode = this.value() || this.getDefaultCode();

    // Create an Angular 19 project
    const project = {
      title: 'Angular Code Editor',
      description: 'Write your Angular code here',
      template: 'node' as const,
      files: {
        'package.json': JSON.stringify({
          name: 'angular-code-editor',
          version: '0.0.0',
          scripts: {
            ng: 'ng',
            start: 'ng serve',
            build: 'ng build',
          },
          dependencies: {
            '@angular/animations': '^19.0.0',
            '@angular/common': '^19.0.0',
            '@angular/compiler': '^19.0.0',
            '@angular/core': '^19.0.0',
            '@angular/forms': '^19.0.0',
            '@angular/platform-browser': '^19.0.0',
            '@angular/platform-browser-dynamic': '^19.0.0',
            '@angular/router': '^19.0.0',
            rxjs: '~7.8.0',
            tslib: '^2.3.0',
            'zone.js': '~0.15.0',
          },
          devDependencies: {
            '@angular-devkit/build-angular': '^19.0.0',
            '@angular/cli': '^19.0.0',
            '@angular/compiler-cli': '^19.0.0',
            typescript: '~5.6.0',
          },
        }, null, 2),
        'tsconfig.json': JSON.stringify({
          compileOnSave: false,
          compilerOptions: {
            outDir: './dist/out-tsc',
            strict: true,
            noImplicitOverride: true,
            noPropertyAccessFromIndexSignature: true,
            noImplicitReturns: true,
            noFallthroughCasesInSwitch: true,
            skipLibCheck: true,
            esModuleInterop: true,
            sourceMap: true,
            declaration: false,
            experimentalDecorators: true,
            moduleResolution: 'bundler',
            importHelpers: true,
            target: 'ES2022',
            module: 'ES2022',
            useDefineForClassFields: false,
            lib: ['ES2022', 'dom'],
          },
        }, null, 2),
        'src/main.ts': `import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

${initialCode}

bootstrapApplication(AppComponent);`,
        'src/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Angular Code</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`,
        'angular.json': JSON.stringify({
          version: 1,
          projects: {
            demo: {
              projectType: 'application',
              root: '',
              sourceRoot: 'src',
              architect: {
                build: {
                  builder: '@angular-devkit/build-angular:application',
                  options: {
                    outputPath: 'dist/demo',
                    index: 'src/index.html',
                    browser: 'src/main.ts',
                    tsConfig: 'tsconfig.json',
                  },
                },
                serve: {
                  builder: '@angular-devkit/build-angular:dev-server',
                  options: {
                    buildTarget: 'demo:build',
                  },
                },
              },
            },
          },
        }, null, 2),
      },
      settings: {
        compile: {
          trigger: 'auto',
          action: 'refresh',
          clearConsole: false,
        },
      },
    };

    // Embed StackBlitz
    this.vm = await sdk.embedProject(this.editorContainer.nativeElement, project, {
      height: parseInt(this.height()) || 600,
      openFile: 'src/main.ts',
      view: 'editor',
      hideNavigation: true,
      hideDevTools: false,
      forceEmbedLayout: true,
    });

    // Listen for file changes
    this.vm.editor.openFile('src/main.ts');
  }

  private async updateEditorContent(newCode: string) {
    if (!this.vm) return;

    try {
      const files = await this.vm.getFsSnapshot();
      const currentContent = files['src/main.ts'];

      // Update if different
      if (!currentContent?.includes(newCode)) {
        await this.vm.applyFsDiff({
          create: {},
          destroy: [],
          patch: {
            'src/main.ts': `import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

${newCode}

bootstrapApplication(AppComponent);`,
          },
        });
      }
    } catch (error) {
      console.error('Error updating editor:', error);
    }
  }

  private getDefaultCode(): string {
    return `@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <h1>Hello Angular!</h1>
  \`
})
export class AppComponent {}`;
  }
}
