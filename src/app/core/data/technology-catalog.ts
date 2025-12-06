import { Technology, TechnologyCategory, TechnologyCatalog } from '../models/technology.model';

// Solo tecnologías con evaluaciones completas disponibles
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
];

export const TECHNOLOGY_CATALOG: TechnologyCatalog = {
  categories: Object.values(TechnologyCategory),
  technologies: TECHNOLOGIES,
};
