import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';

@Injectable({
  providedIn: 'root',
})
export class StackBlitzService {
  private vm: any = null;
  private loading = false;
  private loaded = false;

  async getOrCreateProject(container: HTMLElement, initialCode: string, height: number) {
    // If already created, just update the code
    if (this.vm && this.loaded) {
      await this.updateCode(initialCode);
      return this.vm;
    }

    // If currently loading, wait
    if (this.loading) {
      await this.waitForLoad();
      return this.vm;
    }

    // Create new project
    this.loading = true;
    this.vm = await this.createProject(container, initialCode, height);
    this.loading = false;
    this.loaded = true;

    return this.vm;
  }

  private async createProject(container: HTMLElement, initialCode: string, height: number) {
    const codeWithImports = this.addRequiredImports(initialCode);

    const project = {
      title: 'Angular Code Editor',
      description: 'Write your Angular code here',
      template: 'node' as const,
      files: {
        'package.json': JSON.stringify(
          {
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
          },
          null,
          2
        ),
        'tsconfig.json': JSON.stringify(
          {
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
          },
          null,
          2
        ),
        'src/main.ts': codeWithImports,
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
        'angular.json': JSON.stringify(
          {
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
          },
          null,
          2
        ),
      },
      settings: {
        compile: {
          trigger: 'auto',
          action: 'refresh',
          clearConsole: false,
        },
      },
    };

    const vm = await sdk.embedProject(container, project, {
      height: height || 600,
      openFile: 'src/main.ts',
      view: 'editor',
      hideNavigation: true,
      hideDevTools: false,
      forceEmbedLayout: true,
    });

    await vm.editor.openFile('src/main.ts');
    return vm;
  }

  private async updateCode(newCode: string) {
    if (!this.vm) return;

    try {
      const codeWithImports = this.addRequiredImports(newCode);
      await this.vm.applyFsDiff({
        create: {},
        destroy: [],
        patch: {
          'src/main.ts': codeWithImports,
        },
      });
    } catch (error) {
      console.error('Error updating code:', error);
    }
  }

  private addRequiredImports(code: string): string {
    const imports = new Set<string>();

    // Detect what needs to be imported
    if (code.includes('@Component') || code.includes('Component(')) {
      imports.add("import { Component } from '@angular/core';");
    }
    if (code.includes('ChangeDetectionStrategy')) {
      imports.add("import { ChangeDetectionStrategy } from '@angular/core';");
    }
    if (code.includes('OnInit') || code.includes('ngOnInit')) {
      imports.add("import { OnInit } from '@angular/core';");
    }
    if (code.includes('OnDestroy') || code.includes('ngOnDestroy')) {
      imports.add("import { OnDestroy } from '@angular/core';");
    }
    if (code.includes('ChangeDetectorRef')) {
      imports.add("import { ChangeDetectorRef } from '@angular/core';");
    }
    if (code.includes('interval') || code.includes('timer')) {
      imports.add("import { interval } from 'rxjs';");
    }
    if (code.includes('BehaviorSubject')) {
      imports.add("import { BehaviorSubject } from 'rxjs';");
    }
    if (code.includes('Subject')) {
      imports.add("import { Subject } from 'rxjs';");
    }
    if (
      code.includes('pipe(') ||
      code.includes('map') ||
      code.includes('filter') ||
      code.includes('takeUntil')
    ) {
      imports.add(
        "import { map, filter, tap, takeUntil, switchMap, debounceTime } from 'rxjs/operators';"
      );
    }
    if (code.includes('HttpClient')) {
      imports.add("import { HttpClient } from '@angular/common/http';");
    }
    if (code.includes('FormControl') || code.includes('FormGroup')) {
      imports.add("import { FormControl, FormGroup, Validators } from '@angular/forms';");
    }
    if (code.includes('Router')) {
      imports.add("import { Router } from '@angular/router';");
    }

    // Always add bootstrapApplication
    imports.add("import { bootstrapApplication } from '@angular/platform-browser';");

    const importsString = Array.from(imports).join('\n');

    // Check if code already has a component definition
    const hasComponent = code.includes('@Component') || code.includes('export class');

    if (hasComponent) {
      return `${importsString}\n\n${code}\n\nbootstrapApplication(AppComponent || ListComponent || YourComponent);`;
    } else {
      // Wrap code in a basic component
      return `${importsString}\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  template: \`<h1>Write your code below</h1>\`\n})\nexport class AppComponent {}\n\n${code}\n\nbootstrapApplication(AppComponent);`;
    }
  }

  private async waitForLoad(): Promise<void> {
    return new Promise((resolve) => {
      const checkLoaded = setInterval(() => {
        if (!this.loading && this.loaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
    });
  }

  isLoading(): boolean {
    return this.loading;
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
