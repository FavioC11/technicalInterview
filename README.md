# 🚀 Plataforma de Evaluación Técnica Multi-Tecnología

Aplicación web desarrollada con **Angular 21** que implementa un sistema de pruebas técnicas interactivas para evaluar conocimientos en **múltiples tecnologías y frameworks** en diferentes niveles de experiencia.

## ✨ Características Principales

- ✅ **Soporte Multi-Tecnología**: Frontend, Backend, Big Data, Cloud, DevOps y más
- ✅ **Selector de Tecnología**: Interfaz intuitiva para elegir la tecnología a evaluar
- ✅ **Evaluaciones Especializadas**: Preguntas específicas para cada tecnología
- ✅ **Múltiples Niveles**: Junior, Semi Senior, Senior, Expert
- ✅ **Sistema de Evaluación Automática**: Puntuación y reportes detallados
- ✅ **Interfaz Moderna**: Diseño responsivo y experiencia de usuario fluida
- ✅ **Arquitectura Escalable**: Fácil agregar nuevas tecnologías

## 🎯 Tecnologías Soportadas

### Frontend
- **Angular** 🅰️ - Framework completo de Google (22 preguntas)
- **React** ⚛️ - Librería de UI de Facebook/Meta
- **Vue.js** 💚 - Framework progresivo para interfaces

### Backend
- **Node.js** 🟢 - Runtime de JavaScript en servidor
- **Python** 🐍 - Lenguaje versátil para backend y data
- **Java** ☕ - Lenguaje empresarial robusto
- **.NET Core** 🔷 - Framework de Microsoft multiplataforma

### Databases
- **SQL** 🗄️ - Bases de datos relacionales
- **MongoDB** 🍃 - Base de datos NoSQL

### Big Data
- **Apache Spark** ⚡ - Motor de procesamiento distribuido
- **Hadoop** 🐘 - Framework de procesamiento distribuido
- **Apache Kafka** 📨 - Plataforma de streaming

### Cloud
- **AWS** ☁️ - Amazon Web Services
- **Azure** 🔵 - Microsoft Azure
- **Google Cloud** 🌐 - Google Cloud Platform

### DevOps
- **Docker** 🐳 - Containerización de aplicaciones
- **Kubernetes** ⎈ - Orquestación de contenedores

## 🏗️ Arquitectura

### Tecnologías Utilizadas

- **Angular 21.0.2** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos modulares
- **Standalone Components** - Sin módulos NgModule
- **Signals** - Manejo de estado reactivo
- **Nuevo Control Flow** (@if, @for) - Sintaxis moderna de Angular 17+

### Estructura del Proyecto

```
src/app/
├── core/                               # Servicios y modelos principales
│   ├── models/
│   │   ├── question.model.ts          # Interfaces para preguntas
│   │   └── technology.model.ts        # Modelos de tecnologías
│   ├── services/
│   │   └── assessment.service.ts      # Servicio de evaluación multi-tech
│   └── data/
│       ├── technology-catalog.ts      # Catálogo de tecnologías
│       └── assessments/               # Sets de preguntas por tecnología
│           ├── angular-assessment.ts
│           ├── react-assessment.ts
│           ├── nodejs-assessment.ts
│           ├── python-assessment.ts
│           ├── spark-assessment.ts
│           └── index.ts               # Exportaciones centralizadas
├── shared/                            # Componentes compartidos
│   └── components/
│       ├── header/                    # Cabecera de la aplicación
│       ├── info-box/                  # Caja de información
│       ├── progress-bar/              # Barra de progreso
│       └── technology-selector/       # Selector de tecnología
└── features/                          # Módulos de funcionalidades
    └── assessment/                    # Feature principal de evaluación
        ├── components/
        │   ├── question/             # Componente de pregunta
        │   ├── tabs/                 # Componente de tabs
        │   └── report/               # Componente de reporte
        └── assessment.ts             # Componente contenedor
```

## 🚀 Características Técnicas Modernas

- **Standalone Components**: Sin necesidad de NgModules
- **Signals**: Manejo de estado reactivo con la nueva API de Signals
- **inject()**: Inyección de dependencias funcional
- **@if/@for**: Nuevo control flow de Angular 17+
- **input()/output()**: Nueva API para inputs y outputs
- **Computed Signals**: Valores derivados reactivos

## 📚 Cómo Agregar una Nueva Tecnología

El sistema está diseñado para ser altamente escalable. Para agregar una nueva tecnología:

### 1. Actualizar el Catálogo de Tecnologías

Edita `src/app/core/data/technology-catalog.ts`:

```typescript
export const TECHNOLOGIES: Technology[] = [
  // ... tecnologías existentes
  {
    id: 'nueva-tech',
    name: 'Nueva Tecnología',
    category: TechnologyCategory.FRONTEND, // o BACKEND, BIG_DATA, etc.
    description: 'Descripción breve',
    icon: '🆕',
    color: '#FF6B6B',
    levels: ['Junior', 'Semi Senior', 'Senior', 'Expert'],
  },
];
```

### 2. Crear el Set de Preguntas

Crea `src/app/core/data/assessments/nueva-tech-assessment.ts`:

```typescript
import { AssessmentData, QuestionLevel } from '../../models/question.model';

export const NUEVA_TECH_ASSESSMENT: AssessmentData = {
  technologyId: 'nueva-tech',
  technologyName: 'Nueva Tecnología',
  sections: [
    {
      id: 'section1',
      name: 'Nivel 1: Básico',
      description: 'Fundamentos',
      estimatedTime: '20 minutos',
      totalPoints: 20,
      questions: [
        {
          id: 1,
          level: QuestionLevel.JUNIOR,
          title: 'Pregunta 1 (5 puntos)',
          description: 'Descripción de la pregunta...',
          points: 5,
          sectionId: 'section1',
          criteria: [
            { points: 2, description: 'Criterio 1' },
            { points: 2, description: 'Criterio 2' },
            { points: 1, description: 'Criterio 3' },
          ],
        },
        // Más preguntas...
      ],
    },
    // Más secciones...
  ],
};
```

### 3. Registrar la Nueva Evaluación

Edita `src/app/core/data/assessments/index.ts`:

```typescript
import { NUEVA_TECH_ASSESSMENT } from './nueva-tech-assessment';

export const ASSESSMENTS_MAP: Record<string, AssessmentData> = {
  // ... existentes
  'nueva-tech': NUEVA_TECH_ASSESSMENT,
};
```

¡Listo! La nueva tecnología aparecerá automáticamente en el selector.

## 💻 Desarrollo

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm install
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques archivos.

### Construir

Para construir el proyecto:

```bash
ng build
```

Los artefactos de construcción se almacenarán en el directorio `dist/`. Por defecto, la construcción de producción optimiza la aplicación para rendimiento y velocidad.

### Ejecutar Tests

Para ejecutar tests unitarios con [Vitest](https://vitest.dev/):

```bash
ng test
```

## 📖 Uso de la Aplicación

1. **Selecciona una Tecnología**: Al iniciar, haz clic en "Cambiar Tecnología" para elegir la tecnología que deseas evaluar
2. **Responde las Preguntas**: Navega por las secciones usando las tabs y responde las preguntas en los campos de texto
3. **Genera el Reporte**: Una vez completadas las respuestas, genera el reporte de evaluación
4. **Comparte con Claude**: Copia el reporte y compártelo con Claude para obtener una evaluación detallada

## 🎨 Categorías de Tecnologías

El sistema organiza las tecnologías en las siguientes categorías:

- **Frontend**: Frameworks y librerías para interfaces de usuario
- **Backend**: Lenguajes y frameworks para servidor
- **Database**: Sistemas de bases de datos
- **Big Data**: Herramientas de procesamiento masivo de datos
- **Cloud**: Plataformas de computación en la nube
- **Mobile**: Desarrollo de aplicaciones móviles
- **DevOps**: Herramientas de CI/CD y orquestación

## 🔄 Sistema de Evaluación

Cada evaluación incluye:

- **Preguntas Organizadas por Nivel**: Desde Junior hasta Expert
- **Criterios de Evaluación**: Cada pregunta tiene criterios específicos de puntuación
- **Puntuación Total**: Sistema de 100 puntos
- **Clasificación Automática**:
  - 0-30: Junior Inicial
  - 31-50: Junior Avanzado
  - 51-70: Semi Senior
  - 71-85: Senior
  - 86-100: Expert/Arquitecto

## 🤝 Contribuir

Para contribuir con nuevas tecnologías o mejorar las evaluaciones existentes:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-tecnologia`)
3. Sigue la estructura de evaluaciones existente
4. Asegúrate de que el proyecto compile sin errores
5. Crea un Pull Request

## 📝 Licencia

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## 📞 Recursos Adicionales

Para más información sobre Angular CLI, incluyendo referencias de comandos detalladas, visita la [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
