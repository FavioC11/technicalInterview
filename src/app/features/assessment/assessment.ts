import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentService } from '../../core/services/assessment.service';
import { Header } from '../../shared/components/header/header';
import { InfoBox } from '../../shared/components/info-box/info-box';
import { Tabs } from './components/tabs/tabs';
import { Question } from './components/question/question';
import { Report } from './components/report/report';

@Component({
  selector: 'app-assessment',
  imports: [CommonModule, Header, InfoBox, Tabs, Question, Report],
  templateUrl: './assessment.html',
  styleUrl: './assessment.scss',
})
export class Assessment {
  private assessmentService = inject(AssessmentService);

  activeSectionId = signal('nivel1');
  showReport = signal(false);

  sections = this.assessmentService.getSections();

  activeSection = computed(() =>
    this.assessmentService.getSectionById(this.activeSectionId())
  );

  progressPercentage = this.assessmentService.progressPercentage;
  answeredCount = this.assessmentService.answeredQuestions;
  totalQuestions = this.assessmentService.totalQuestions;

  onSectionChange(sectionId: string) {
    this.activeSectionId.set(sectionId);
    this.showReport.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onAnswerChange(event: { questionId: number; answer: string }) {
    this.assessmentService.saveAnswer(event.questionId, event.answer);
  }

  isQuestionAnswered(questionId: number): boolean {
    return this.assessmentService.isQuestionAnswered(questionId);
  }

  getAnswer(questionId: number): string {
    const answer = this.assessmentService.getAnswer(questionId);
    return answer?.answer || '';
  }

  generateReport() {
    const answeredCount = this.assessmentService.answeredQuestions();

    if (answeredCount === 0) {
      alert('Por favor responde al menos una pregunta antes de generar el reporte.');
      return;
    }

    this.showReport.set(true);
    setTimeout(() => {
      const reportElement = document.getElementById('reportContainer');
      if (reportElement) {
        reportElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  getReport() {
    return this.assessmentService.generateReport();
  }

  getReportText() {
    return this.assessmentService.generateReportText();
  }

  resetTest() {
    this.assessmentService.clearAllAnswers();
    this.showReport.set(false);
    this.activeSectionId.set('nivel1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
