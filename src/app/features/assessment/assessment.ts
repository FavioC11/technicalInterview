import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentService } from '../../core/services/assessment.service';
import { Header } from '../../shared/components/header/header';
import { InfoBox } from '../../shared/components/info-box/info-box';
import { Tabs } from './components/tabs/tabs';
import { Question } from './components/question/question';
import { Report } from './components/report/report';
import { TechnologySelectorComponent } from '../../shared/components/technology-selector/technology-selector';

@Component({
  selector: 'app-assessment',
  imports: [CommonModule, Header, InfoBox, Tabs, Question, Report, TechnologySelectorComponent],
  templateUrl: './assessment.html',
  styleUrl: './assessment.scss',
})
export class Assessment {
  private assessmentService = inject(AssessmentService);

  showTechnologySelector = signal(false);
  activeSectionId = signal('nivel1');
  showReport = signal(false);

  sections = computed(() => this.assessmentService.getSections());
  selectedTechnology = computed(() => this.assessmentService.getSelectedTechnology());

  activeSection = computed(() => this.assessmentService.getSectionById(this.activeSectionId()));

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
    this.initializeActiveSectionId();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleTechnologySelector() {
    this.showTechnologySelector.update(v => !v);
  }

  onTechnologyChange() {
    this.showTechnologySelector.set(false);
    this.showReport.set(false);
    this.initializeActiveSectionId();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initializeActiveSectionId() {
    const sections = this.assessmentService.getSections();
    if (sections.length > 0) {
      this.activeSectionId.set(sections[0].id);
    }
  }
}
