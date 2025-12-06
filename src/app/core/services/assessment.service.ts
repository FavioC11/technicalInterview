import { Injectable, signal, computed } from '@angular/core';
import {
  Section,
  Question,
  Answer,
  AssessmentReport,
  AssessmentData,
} from '../models/question.model';
import { Technology } from '../models/technology.model';
import { TECHNOLOGIES } from '../data/technology-catalog';
import { getAssessmentByTechnology } from '../data/assessments';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private answers = signal<Map<number, Answer>>(new Map());
  private selectedTechnology = signal<Technology | null>(null);
  private currentAssessment = signal<AssessmentData | null>(null);

  // Computed signals
  answeredQuestions = computed(() => this.answers().size);
  totalQuestions = computed(() => this.getAllQuestions().length);
  progressPercentage = computed(() =>
    Math.round((this.answeredQuestions() / this.totalQuestions()) * 100)
  );

  constructor() {
    // Load Angular as default technology for backward compatibility
    const defaultTech = TECHNOLOGIES.find((t) => t.id === 'angular');
    if (defaultTech) {
      this.setTechnology(defaultTech.id);
    }
  }

  // Technology Management
  getAllTechnologies(): Technology[] {
    return TECHNOLOGIES;
  }

  getTechnologyById(id: string): Technology | undefined {
    return TECHNOLOGIES.find((t) => t.id === id);
  }

  getSelectedTechnology(): Technology | null {
    return this.selectedTechnology();
  }

  setTechnology(technologyId: string): boolean {
    const technology = this.getTechnologyById(technologyId);
    if (!technology) {
      return false;
    }

    const assessment = getAssessmentByTechnology(technologyId);
    if (!assessment) {
      return false;
    }

    this.selectedTechnology.set(technology);
    this.currentAssessment.set(assessment);
    this.clearAllAnswers(); // Clear answers when switching technology
    return true;
  }

  // Section and Question Management
  getSections(): Section[] {
    const assessment = this.currentAssessment();
    return assessment?.sections || [];
  }

  getSectionById(id: string): Section | undefined {
    return this.getSections().find((s) => s.id === id);
  }

  getAllQuestions(): Question[] {
    return this.getSections().flatMap((s) => s.questions);
  }

  getQuestionById(id: number): Question | undefined {
    return this.getAllQuestions().find((q) => q.id === id);
  }

  // Answer Management
  saveAnswer(questionId: number, answerText: string): void {
    const answer: Answer = {
      questionId,
      answer: answerText,
      timestamp: new Date(),
    };

    this.answers.update((current) => {
      const updated = new Map(current);
      updated.set(questionId, answer);
      return updated;
    });
  }

  getAnswer(questionId: number): Answer | undefined {
    return this.answers().get(questionId);
  }

  getAllAnswers(): Answer[] {
    return Array.from(this.answers().values());
  }

  isQuestionAnswered(questionId: number): boolean {
    const answer = this.getAnswer(questionId);
    return !!answer && answer.answer.trim().length > 10;
  }

  clearAllAnswers(): void {
    this.answers.set(new Map());
  }

  // Report Generation
  generateReport(): AssessmentReport {
    const allAnswers = this.getAllAnswers();
    const answeredCount = allAnswers.filter((a) => a.answer.trim().length > 10).length;
    const totalQuestions = this.getAllQuestions().length;
    const estimatedScore = Math.round((answeredCount / totalQuestions) * 70);

    let level = 'Junior Inicial';
    if (estimatedScore >= 86) level = 'Expert/Arquitecto';
    else if (estimatedScore >= 71) level = 'Senior';
    else if (estimatedScore >= 51) level = 'Semi Senior';
    else if (estimatedScore >= 31) level = 'Junior Avanzado';

    const recommendations = [
      'Copia el reporte completo y compártelo con Claude para obtener una evaluación detallada',
      'Claude analizará cada respuesta según los criterios establecidos',
      'Recibirás puntuación exacta, nivel real, y recomendaciones personalizadas',
      'La puntuación mostrada aquí es solo una estimación visual',
    ];

    const technology = this.selectedTechnology();
    const assessment = this.currentAssessment();

    return {
      candidateName: '[Tu Nombre]',
      date: new Date(),
      technologyId: technology?.id || 'unknown',
      technologyName: assessment?.technologyName || 'Unknown',
      answeredCount,
      totalQuestions,
      estimatedScore,
      level,
      answers: allAnswers,
      recommendations,
    };
  }

  generateReportText(): string {
    const report = this.generateReport();
    const allQuestions = this.getAllQuestions();

    let reportText = `================================
REPORTE DE EVALUACIÓN TÉCNICA - ${report.technologyName.toUpperCase()}
================================

Candidato: ${report.candidateName}
Tecnología: ${report.technologyName}
Fecha: ${report.date.toLocaleDateString('es-ES')}
Preguntas Respondidas: ${report.answeredCount} de ${report.totalQuestions}

================================
RESPUESTAS DEL CANDIDATO
================================

`;

    report.answers.forEach((answer) => {
      const question = allQuestions.find((q) => q.id === answer.questionId);
      if (question) {
        reportText += `
[${question.level}] PREGUNTA ${question.id}: ${question.title}
${'-'.repeat(80)}
${answer.answer}

`;
      }
    });

    reportText += `
================================
INSTRUCCIONES PARA CLAUDE
================================

Por favor, analiza este reporte de evaluación técnica de ${report.technologyName} y proporciona:

1. PUNTUACIÓN DETALLADA:
   - Evalúa cada respuesta según los criterios establecidos
   - Asigna puntuación específica para cada pregunta
   - Calcula puntuación total sobre 100

2. CLASIFICACIÓN DE NIVEL:
   - 0-30: Junior Inicial
   - 31-50: Junior Avanzado
   - 51-70: Semi Senior
   - 71-85: Senior
   - 86-100: Expert/Arquitecto

3. ANÁLISIS POR ÁREAS:
   - Conocimiento teórico
   - Habilidades prácticas
   - Best practices
   - Arquitectura y diseño
   - Actualización tecnológica

4. FORTALEZAS Y DEBILIDADES:
   - Identifica áreas donde destaca
   - Señala áreas de mejora
   - Proporciona recomendaciones específicas

5. RECOMENDACIONES DE ESTUDIO:
   - Temas a reforzar
   - Recursos recomendados
   - Plan de acción sugerido

================================
`;

    return reportText;
  }
}
