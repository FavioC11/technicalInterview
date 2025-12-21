import {
  Component,
  ElementRef,
  ViewChild,
  input,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { StackBlitzService } from '../../services/stackblitz.service';

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
  height = input<string>('600px');

  // Services
  private stackblitzService = inject(StackBlitzService);

  async ngAfterViewInit() {
    await this.initStackBlitz();
  }

  ngOnDestroy() {
    // StackBlitz cleanup happens automatically
  }

  private async initStackBlitz() {
    try {
      const initialCode = this.value() || this.getDefaultCode();

      await this.stackblitzService.createProject(
        this.editorContainer.nativeElement,
        initialCode,
        parseInt(this.height()) || 600
      );
    } catch (error) {
      console.error('Error initializing StackBlitz:', error);
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
