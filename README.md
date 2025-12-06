# 🅰️ Prueba Técnica Angular - Evaluación Interactiva

Aplicación web desarrollada con **Angular 21** (última versión) que implementa una prueba técnica interactiva para evaluar conocimientos de Angular en diferentes niveles de experiencia.

## 📋 Características

- ✅ **22 preguntas** organizadas en 6 secciones (100 puntos totales)
- ✅ Niveles: Junior, Semi Senior, Senior, Expert y Angular Moderno
- ✅ Interfaz interactiva con navegación por tabs
- ✅ Sistema de evaluación automática
- ✅ Generación de reporte detallado
- ✅ Funcionalidad de copiar reporte al portapapeles
- ✅ Arquitectura modular y escalable

## 🏗️ Arquitectura

### Tecnologías Utilizadas

- **Angular 21.0.2** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos
- **Standalone Components** - Sin módulos NgModule
- **Signals** - Para manejo de estado reactivo
- **Nuevo Control Flow** (@if, @for) - Sintaxis moderna de Angular 17+

### Estructura del Proyecto

```
src/app/
├── core/                          # Servicios y modelos principales
│   ├── models/
│   │   └── question.model.ts     # Interfaces y tipos
│   └── services/
│       └── assessment.service.ts # Servicio de evaluación
├── shared/                        # Componentes compartidos
│   └── components/
│       ├── header/               # Cabecera de la aplicación
│       ├── info-box/             # Caja de información
│       └── progress-bar/         # Barra de progreso
└── features/                      # Módulos de funcionalidades
    └── assessment/               # Feature principal de evaluación
        ├── components/
        │   ├── question/        # Componente de pregunta
        │   ├── tabs/            # Componente de tabs
        │   └── report/          # Componente de reporte
        └── assessment.ts        # Componente contenedor
```

## 🚀 Características Técnicas Modernas

- **Standalone Components**: Sin necesidad de NgModules
- **Signals**: Manejo de estado reactivo con la nueva API de Signals
- **inject()**: Inyección de dependencias funcional
- **@if/@for**: Nuevo control flow de Angular 17+
- **input()/output()**: Nueva API para inputs y outputs

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
