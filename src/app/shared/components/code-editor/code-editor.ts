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

    // Create a minimal Angular project
    const project = {
      title: 'Angular Code Editor',
      description: 'Write your Angular code here',
      template: 'angular-cli' as const,
      files: {
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
