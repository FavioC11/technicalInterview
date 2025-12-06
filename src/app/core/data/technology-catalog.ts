import { Technology, TechnologyCategory, TechnologyCatalog } from '../models/technology.model';

export const TECHNOLOGIES: Technology[] = [
  // Frontend Technologies
  {
    id: 'angular',
    name: 'Angular',
    category: TechnologyCategory.FRONTEND,
    description: 'Framework frontend completo de Google',
    icon: '🅰️',
    color: '#DD0031',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'react',
    name: 'React',
    category: TechnologyCategory.FRONTEND,
    description: 'Librería de UI de Facebook/Meta',
    icon: '⚛️',
    color: '#61DAFB',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: TechnologyCategory.FRONTEND,
    description: 'Framework progresivo para interfaces',
    icon: '💚',
    color: '#42B883',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },

  // Backend Technologies
  {
    id: 'nodejs',
    name: 'Node.js',
    category: TechnologyCategory.BACKEND,
    description: 'Runtime de JavaScript en servidor',
    icon: '🟢',
    color: '#339933',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'python',
    name: 'Python',
    category: TechnologyCategory.BACKEND,
    description: 'Lenguaje versátil para backend y data',
    icon: '🐍',
    color: '#3776AB',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'java',
    name: 'Java',
    category: TechnologyCategory.BACKEND,
    description: 'Lenguaje empresarial robusto',
    icon: '☕',
    color: '#007396',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'dotnet',
    name: '.NET Core',
    category: TechnologyCategory.BACKEND,
    description: 'Framework de Microsoft multiplataforma',
    icon: '🔷',
    color: '#512BD4',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },

  // Database Technologies
  {
    id: 'sql',
    name: 'SQL',
    category: TechnologyCategory.DATABASE,
    description: 'Bases de datos relacionales',
    icon: '🗄️',
    color: '#4479A1',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: TechnologyCategory.DATABASE,
    description: 'Base de datos NoSQL orientada a documentos',
    icon: '🍃',
    color: '#47A248',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },

  // Big Data Technologies
  {
    id: 'spark',
    name: 'Apache Spark',
    category: TechnologyCategory.BIG_DATA,
    description: 'Motor de procesamiento distribuido',
    icon: '⚡',
    color: '#E25A1C',
    levels: ['Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'hadoop',
    name: 'Hadoop',
    category: TechnologyCategory.BIG_DATA,
    description: 'Framework de procesamiento distribuido',
    icon: '🐘',
    color: '#FF7F00',
    levels: ['Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'kafka',
    name: 'Apache Kafka',
    category: TechnologyCategory.BIG_DATA,
    description: 'Plataforma de streaming distribuido',
    icon: '📨',
    color: '#231F20',
    levels: ['Semi Senior', 'Senior', 'Expert'],
  },

  // Cloud Technologies
  {
    id: 'aws',
    name: 'AWS',
    category: TechnologyCategory.CLOUD,
    description: 'Amazon Web Services',
    icon: '☁️',
    color: '#FF9900',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'azure',
    name: 'Azure',
    category: TechnologyCategory.CLOUD,
    description: 'Microsoft Azure',
    icon: '🔵',
    color: '#0089D6',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: TechnologyCategory.CLOUD,
    description: 'Google Cloud Platform',
    icon: '🌐',
    color: '#4285F4',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },

  // DevOps Technologies
  {
    id: 'docker',
    name: 'Docker',
    category: TechnologyCategory.DEVOPS,
    description: 'Containerización de aplicaciones',
    icon: '🐳',
    color: '#2496ED',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: TechnologyCategory.DEVOPS,
    description: 'Orquestación de contenedores',
    icon: '⎈',
    color: '#326CE5',
    levels: ['Semi Senior', 'Senior', 'Expert'],
  },
];

export const TECHNOLOGY_CATALOG: TechnologyCatalog = {
  categories: Object.values(TechnologyCategory),
  technologies: TECHNOLOGIES,
};
