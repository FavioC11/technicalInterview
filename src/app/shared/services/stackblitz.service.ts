import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';

@Injectable({
  providedIn: 'root',
})
export class StackBlitzService {
  async createProject(container: HTMLElement, initialCode: string, height: number) {
    const codeWithImports = this.addRequiredImports(initialCode);

    // Use angular-cli template (fast - Angular pre-installed)
    const project = {
      title: 'Angular Code Editor',
      description: 'Write your Angular code here',
      template: 'angular-cli' as const,
      files: {
        'src/main.ts': codeWithImports,
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
}
