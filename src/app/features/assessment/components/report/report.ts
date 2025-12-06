import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentReport } from '../../../../core/models/question.model';
import { ProgressBar } from '../../../../shared/components/progress-bar/progress-bar';

@Component({
  selector: 'app-report',
  imports: [CommonModule, ProgressBar],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export class Report {
  report = input.required<AssessmentReport>();
  reportText = input.required<string>();

  resetTest = output<void>();

  copySuccess = signal(false);
  Math = Math;

  getLevelClass(): string {
    const score = this.report().estimatedScore;
    if (score >= 86) return 'score-expert-result';
    if (score >= 71) return 'score-senior-result';
    if (score >= 51) return 'score-semi-senior-result';
    return 'score-junior-result';
  }

  copyReport() {
    navigator.clipboard.writeText(this.reportText()).then(() => {
      this.copySuccess.set(true);
      setTimeout(() => {
        this.copySuccess.set(false);
      }, 2000);
    });
  }

  onResetTest() {
    if (
      confirm('¿Estás seguro de que quieres reiniciar la prueba? Se perderán todas tus respuestas.')
    ) {
      this.resetTest.emit();
    }
  }
}
