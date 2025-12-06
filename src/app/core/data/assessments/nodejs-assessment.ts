import { AssessmentData, QuestionLevel } from '../../models/question.model';

export const NODEJS_ASSESSMENT: AssessmentData = {
  technologyId: 'nodejs',
  technologyName: 'Node.js',
  sections: [
    {
      id: 'fundamentals',
      name: 'Fundamentos de Node.js',
      description: 'Conceptos core de Node.js',
      estimatedTime: '25 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 201,
          level: QuestionLevel.JUNIOR,
          title: 'Event Loop y Asincronía (5 puntos)',
          description:
            '¿Qué es el Event Loop? Explica cómo Node.js maneja operaciones asíncronas siendo single-threaded. Diferencia entre blocking y non-blocking.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Explica Event Loop correctamente' },
            { points: 2, description: 'Single-threaded con libuv' },
            { points: 1, description: 'Diferencia blocking vs non-blocking' },
          ],
        },
        {
          id: 202,
          level: QuestionLevel.JUNIOR,
          title: 'Módulos CommonJS vs ES Modules (4 puntos)',
          description:
            'Explica la diferencia entre require/module.exports y import/export. ¿Cuándo usar cada uno?',
          points: 4,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'CommonJS (require) vs ESM (import)' },
            { points: 1, description: 'Diferencias en carga (síncrona vs asíncrona)' },
            { points: 1, description: 'Configuración con package.json type: module' },
          ],
        },
        {
          id: 203,
          level: QuestionLevel.JUNIOR,
          title: 'Callbacks, Promises y Async/Await (5 puntos)',
          description:
            'Convierte este código de callbacks a Promises y luego a async/await. Explica ventajas de cada enfoque.',
          codeExample: `fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});`,
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Conversión a Promises correcta' },
            { points: 2, description: 'Implementación con async/await' },
            { points: 1, description: 'Explica ventajas de cada patrón' },
          ],
        },
        {
          id: 204,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Streams y Buffers (5 puntos)',
          description:
            '¿Qué son los Streams? Implementa un programa que lea un archivo grande usando streams. ¿Por qué es mejor que readFile para archivos grandes?',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Explica Readable/Writable/Transform streams' },
            { points: 2, description: 'Implementa createReadStream correctamente' },
            { points: 1, description: 'Ventajas de memoria con streams' },
          ],
        },
        {
          id: 205,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Error Handling (6 puntos)',
          description:
            'Implementa manejo de errores robusto: try/catch, Promise rejection, uncaughtException, unhandledRejection. Best practices.',
          points: 6,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Try/catch en async/await' },
            { points: 2, description: '.catch() en Promises' },
            { points: 2, description: 'Global error handlers (process.on)' },
          ],
        },
      ],
    },
    {
      id: 'express',
      name: 'Express.js y APIs',
      description: 'Desarrollo de APIs RESTful',
      estimatedTime: '30 minutos',
      totalPoints: 30,
      questions: [
        {
          id: 206,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'REST API Básica (6 puntos)',
          description:
            'Crea una API REST CRUD para "users" con Express: GET (all, by id), POST, PUT, DELETE. Incluye validación básica.',
          points: 6,
          sectionId: 'express',
          criteria: [
            { points: 2, description: 'Rutas CRUD correctamente definidas' },
            { points: 2, description: 'Métodos HTTP apropiados' },
            { points: 2, description: 'Validación de request body' },
          ],
        },
        {
          id: 207,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Middleware (6 puntos)',
          description:
            'Explica qué es middleware. Crea middlewares para: logging, autenticación JWT, manejo de errores, y CORS.',
          points: 6,
          sectionId: 'express',
          criteria: [
            { points: 2, description: 'Concepto de middleware chain' },
            { points: 2, description: 'Middleware de autenticación' },
            { points: 2, description: 'Error handling middleware (4 params)' },
          ],
        },
        {
          id: 208,
          level: QuestionLevel.SENIOR,
          title: 'Autenticación JWT (6 puntos)',
          description:
            'Implementa sistema de autenticación: registro, login (genera JWT), middleware de verificación, refresh tokens.',
          points: 6,
          sectionId: 'express',
          criteria: [
            { points: 2, description: 'Hash de passwords con bcrypt' },
            { points: 2, description: 'Generación y verificación de JWT' },
            { points: 2, description: 'Refresh token strategy' },
          ],
        },
        {
          id: 209,
          level: QuestionLevel.SENIOR,
          title: 'Rate Limiting y Seguridad (6 puntos)',
          description:
            'Implementa medidas de seguridad: rate limiting, helmet.js, input sanitization, SQL injection prevention.',
          points: 6,
          sectionId: 'express',
          criteria: [
            { points: 2, description: 'Rate limiting con express-rate-limit' },
            { points: 2, description: 'Helmet.js para headers seguros' },
            { points: 2, description: 'Sanitización de inputs' },
          ],
        },
        {
          id: 210,
          level: QuestionLevel.EXPERT,
          title: 'GraphQL vs REST (6 puntos)',
          description:
            'Compara GraphQL vs REST. Implementa un resolver GraphQL básico con queries y mutations.',
          points: 6,
          sectionId: 'express',
          criteria: [
            { points: 2, description: 'Ventajas/desventajas de cada enfoque' },
            { points: 2, description: 'Schema GraphQL definido' },
            { points: 2, description: 'Resolvers implementados' },
          ],
        },
      ],
    },
    {
      id: 'advanced',
      name: 'Node.js Avanzado',
      description: 'Performance y escalabilidad',
      estimatedTime: '25 minutos',
      totalPoints: 20,
      questions: [
        {
          id: 211,
          level: QuestionLevel.SENIOR,
          title: 'Cluster y Worker Threads (5 puntos)',
          description:
            'Explica el módulo Cluster vs Worker Threads. ¿Cuándo usar cada uno? Implementa clustering básico.',
          points: 5,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Cluster para múltiples procesos' },
            { points: 2, description: 'Worker Threads para CPU-intensive' },
            { points: 1, description: 'Implementación con cluster.fork()' },
          ],
        },
        {
          id: 212,
          level: QuestionLevel.SENIOR,
          title: 'Caching Strategies (5 puntos)',
          description:
            'Implementa caching con Redis: cache-aside pattern, TTL, invalidación de cache.',
          points: 5,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Redis client setup' },
            { points: 2, description: 'Cache-aside pattern implementado' },
            { points: 1, description: 'TTL y estrategias de invalidación' },
          ],
        },
        {
          id: 213,
          level: QuestionLevel.EXPERT,
          title: 'Microservicios y Message Queues (5 puntos)',
          description:
            'Diseña arquitectura de microservicios con RabbitMQ o Kafka. Patrones: saga, event sourcing.',
          points: 5,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Comunicación entre servicios' },
            { points: 2, description: 'Message queue implementation' },
            { points: 1, description: 'Patrón saga o event sourcing' },
          ],
        },
        {
          id: 214,
          level: QuestionLevel.EXPERT,
          title: 'Performance Monitoring (5 puntos)',
          description:
            'Implementa monitoring y profiling: memory leaks, CPU profiling, métricas con Prometheus.',
          points: 5,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Detectar memory leaks con heap snapshots' },
            { points: 2, description: 'CPU profiling con --inspect' },
            { points: 1, description: 'Métricas custom con prom-client' },
          ],
        },
      ],
    },
  ],
};
