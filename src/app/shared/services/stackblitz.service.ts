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

    // Use angular-cli template (much faster - Angular already installed)
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
