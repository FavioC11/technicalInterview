export enum QuestionLevel {
  JUNIOR = 'JUNIOR',
  SEMI_SENIOR = 'SEMI SENIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
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
  answeredCount: number;
  totalQuestions: number;
  estimatedScore: number;
  level: string;
  answers: Answer[];
  recommendations: string[];
}
