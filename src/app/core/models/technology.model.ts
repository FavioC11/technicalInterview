export enum TechnologyCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  BIG_DATA = 'Big Data',
  CLOUD = 'Cloud',
  MOBILE = 'Mobile',
  DEVOPS = 'DevOps',
  DOTNET = 'Dotnet',
}

export interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  description: string;
  icon: string;
  color: string;
  levels: string[];
}

export interface TechnologyCatalog {
  categories: TechnologyCategory[];
  technologies: Technology[];
}
