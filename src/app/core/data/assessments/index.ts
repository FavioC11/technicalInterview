import { AssessmentData } from '../../models/question.model';
import { ANGULAR_ASSESSMENT } from './angular-assessment';
import { REACT_ASSESSMENT } from './react-assessment';
import { NODEJS_ASSESSMENT } from './nodejs-assessment';
import { PYTHON_ASSESSMENT } from './python-assessment';
import { SPARK_ASSESSMENT } from './spark-assessment';
import { DOTNET_ASSESSMENT } from './dotnet-assessment';

export const ASSESSMENTS_MAP: Record<string, AssessmentData> = {
  angular: ANGULAR_ASSESSMENT,
  react: REACT_ASSESSMENT,
  nodejs: NODEJS_ASSESSMENT,
  python: PYTHON_ASSESSMENT,
  spark: SPARK_ASSESSMENT,
  dotnet: DOTNET_ASSESSMENT,
};

export function getAssessmentByTechnology(technologyId: string): AssessmentData | undefined {
  return ASSESSMENTS_MAP[technologyId];
}

export function getAvailableAssessments(): string[] {
  return Object.keys(ASSESSMENTS_MAP);
}
