import {
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  effect,
  AfterViewInit,
  OnDestroy,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackBlitzService } from '../../services/stackblitz.service';

@Component({
  selector: 'app-code-editor',
  imports: [CommonModule],
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

  // Services
  private stackblitzService = inject(StackBlitzService);

  // State
  isLoading = signal(true);

  constructor() {
    // Watch for value changes from parent
    effect(() => {
      const newValue = this.value();
      if (this.stackblitzService.isLoaded() && newValue) {
        // Service will handle updating the code
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
    try {
      this.isLoading.set(true);
      const initialCode = this.value() || this.getDefaultCode();

      await this.stackblitzService.getOrCreateProject(
        this.editorContainer.nativeElement,
        initialCode,
        parseInt(this.height()) || 600
      );

      this.isLoading.set(false);
    } catch (error) {
      console.error('Error initializing StackBlitz:', error);
      this.isLoading.set(false);
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
