import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';

@Injectable({
  providedIn: 'root',
})
export class StackBlitzService {
  async createProject(container: HTMLElement, initialCode: string, height: number) {
    const componentCode = this.buildComponentCode(initialCode);

    // Use angular-cli template (fast - Angular pre-installed) with clean file structure
    const project = {
      title: 'Angular Code Editor',
      description: 'Write your Angular code here',
      template: 'angular-cli' as const,
      files: {
        'src/main.ts': this.getMainTs(),
        'src/app/app.component.ts': componentCode,
        'src/app/app.component.html': this.getDefaultTemplate(),
        'src/index.html': this.getIndexHtml(),
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

  private getMainTs(): string {
    return `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));`;
  }

  private getDefaultTemplate(): string {
    return `<div class="container">
  <h1>Angular Component</h1>
  <p>Edit app.component.ts to start coding</p>
</div>`;
  }

  private buildComponentCode(initialCode: string): string {
    const imports = this.detectImports(initialCode);

    // Check if code already has a complete component
    if (initialCode.includes('@Component') && initialCode.includes('export class')) {
      return `${imports}\n\n${initialCode}`;
    }

    // Create a clean standalone component structure
    return `${imports}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styles: []
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
