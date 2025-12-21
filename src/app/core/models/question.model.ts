export enum QuestionLevel {
  JUNIOR = 'JUNIOR',
  SEMI_SENIOR = 'SEMI SENIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT',
}

export interface EvaluationCriteria {
  points: number;
  description: string;
}

export interface Question {
  id: number;
  level: QuestionLevel;
  title: string;
  description: string;
  codeExample?: string;
  requiresCodeEditor?: boolean;
  editorLanguage?: string;
  points: number;
  criteria: EvaluationCriteria[];
  sectionId: string;
}

export interface Answer {
  questionId: number;
  answer: string;
  timestamp: Date;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  totalPoints: number;
  questions: Question[];
}

export interface AssessmentReport {
  candidateName: string;
  date: Date;
  technologyId: string;
  technologyName: string;
  answeredCount: number;
  totalQuestions: number;
  estimatedScore: number;
  level: string;
  answers: Answer[];
  recommendations: string[];
}

export interface AssessmentData {
  technologyId: string;
  technologyName: string;
  sections: Section[];
}
