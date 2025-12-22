import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';

@Injectable({
  providedIn: 'root',
})
export class StackBlitzService {
  async createProject(container: HTMLElement, initialCode: string, height: number) {
    const componentCode = this.buildComponentCode(initialCode);

    // Clean Angular 21 starter template
    const project = {
      title: 'Angular Code Editor',
      description: 'Write your Angular code here',
      template: 'node' as const,
      files: {
        'package.json': this.getPackageJson(),
        'tsconfig.json': this.getTsConfig(),
        'index.html': this.getIndexHtml(),
        'src/main.ts': this.getMainTs(componentCode),
        'src/app/app.component.ts': componentCode,
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
      openFile: 'src/app/app.component.ts',
      view: 'editor',
      hideNavigation: true,
      hideDevTools: false,
      forceEmbedLayout: true,
    });

    await vm.editor.openFile('src/app/app.component.ts');
    return vm;
  }

  private getPackageJson(): string {
    return JSON.stringify({
      name: 'angular-starter',
      version: '0.0.0',
      private: true,
      type: 'module',
      dependencies: {
        '@angular/animations': '^21.0.0',
        '@angular/common': '^21.0.0',
        '@angular/compiler': '^21.0.0',
        '@angular/core': '^21.0.0',
        '@angular/forms': '^21.0.0',
        '@angular/platform-browser': '^21.0.0',
        '@angular/platform-browser-dynamic': '^21.0.0',
        '@angular/router': '^21.0.0',
        'rxjs': '~7.8.0',
        'tslib': '^2.3.0',
        'zone.js': '~0.15.0'
      },
      devDependencies: {
        '@angular-devkit/build-angular': '^21.0.0',
        '@angular/cli': '^21.0.0',
        '@angular/compiler-cli': '^21.0.0',
        'typescript': '~5.6.0'
      }
    }, null, 2);
  }

  private getTsConfig(): string {
    return JSON.stringify({
      compileOnSave: false,
      compilerOptions: {
        outDir: './dist/out-tsc',
        forceConsistentCasingInFileNames: true,
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
        lib: ['ES2022', 'dom']
      },
      angularCompilerOptions: {
        enableI18nLegacyMessageIdFormat: false,
        strictInjectionParameters: true,
        strictInputAccessModifiers: true,
        strictTemplates: true
      }
    }, null, 2);
  }

  private getIndexHtml(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angular Code Editor</title>
</head>
<body>
  <app-root></app-root>
</body>
</html>`;
  }

  private getMainTs(componentCode: string): string {
    return `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));`;
  }

  private buildComponentCode(initialCode: string): string {
    const imports = this.detectImports(initialCode);

    // Check if code already has a complete component
    if (initialCode.includes('@Component') && initialCode.includes('export class')) {
      return `${imports}\n\n${initialCode}`;
    }

    // Otherwise, create a basic component structure
    return `${imports}

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <div>
      <h1>Your Angular Component</h1>
      <!-- Add your template here -->
    </div>
  \`,
  styles: [\`
    :host {
      display: block;
      padding: 1rem;
    }
  \`]
})
export class AppComponent {
  ${initialCode}
}`;
  }

  private detectImports(code: string): string {
    const imports = new Set<string>();

    // Always add Component
    imports.add("import { Component } from '@angular/core';");

    // Detect other Angular imports
    if (code.includes('ChangeDetectionStrategy')) {
      imports.add("import { ChangeDetectionStrategy } from '@angular/core';");
    }
    if (code.includes('OnInit') || code.includes('ngOnInit')) {
      imports.add("import { OnInit } from '@angular/core';");
    }
    if (code.includes('OnDestroy') || code.includes('ngOnDestroy')) {
      imports.add("import { OnDestroy } from '@angular/core';");
    }
    if (code.includes('signal') || code.includes('computed')) {
      imports.add("import { signal, computed } from '@angular/core';");
    }
    if (code.includes('input(') || code.includes('output(')) {
      imports.add("import { input, output } from '@angular/core';");
    }

    // RxJS imports
    if (code.includes('interval') || code.includes('timer') || code.includes('of')) {
      imports.add("import { interval, timer, of } from 'rxjs';");
    }
    if (code.includes('BehaviorSubject') || code.includes('Subject') || code.includes('ReplaySubject')) {
      imports.add("import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';");
    }
    if (code.includes('map') || code.includes('filter') || code.includes('tap') || code.includes('takeUntil')) {
      imports.add("import { map, filter, tap, takeUntil, switchMap, debounceTime } from 'rxjs/operators';");
    }

    // Forms
    if (code.includes('FormControl') || code.includes('FormGroup')) {
      imports.add("import { FormControl, FormGroup, Validators } from '@angular/forms';");
    }

    // HTTP
    if (code.includes('HttpClient')) {
      imports.add("import { HttpClient } from '@angular/common/http';");
    }

    // Router
    if (code.includes('Router') || code.includes('ActivatedRoute')) {
      imports.add("import { Router, ActivatedRoute } from '@angular/router';");
    }

    return Array.from(imports).join('\n');
  }
}
