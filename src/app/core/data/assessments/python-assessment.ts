import { AssessmentData, QuestionLevel } from '../../models/question.model';

export const PYTHON_ASSESSMENT: AssessmentData = {
  technologyId: 'python',
  technologyName: 'Python',
  sections: [
    {
      id: 'fundamentals',
      name: 'Fundamentos de Python',
      description: 'Core concepts de Python',
      estimatedTime: '25 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 301,
          level: QuestionLevel.JUNIOR,
          title: 'List Comprehensions y Generators (5 puntos)',
          description:
            'Explica list comprehensions, dict comprehensions y generators. Implementa ejemplos de cada uno y explica cuándo usar generators.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'List/dict comprehensions correctas' },
            { points: 2, description: 'Generator con yield' },
            { points: 1, description: 'Ventajas de memoria con generators' },
          ],
        },
        {
          id: 302,
          level: QuestionLevel.JUNIOR,
          title: 'Decorators (5 puntos)',
          description:
            'Explica qué son decorators. Implementa decorators para: logging, timing, autenticación.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Concepto de decorator como wrapper' },
            { points: 2, description: 'Implementa decorator funcional' },
            { points: 1, description: 'Uso de functools.wraps' },
          ],
        },
        {
          id: 303,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Context Managers (5 puntos)',
          description:
            'Explica el protocolo with. Implementa un context manager custom usando __enter__ y __exit__, y con @contextmanager.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Implementa __enter__ y __exit__' },
            { points: 2, description: 'Versión con @contextmanager' },
            { points: 1, description: 'Manejo de excepciones' },
          ],
        },
        {
          id: 304,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Type Hints y Mypy (5 puntos)',
          description:
            'Implementa funciones con type hints: genéricos, Union, Optional, TypedDict. Explica beneficios de static typing.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Type hints básicos correctos' },
            { points: 2, description: 'Tipos avanzados (Generic, Union, etc)' },
            { points: 1, description: 'Beneficios y uso de mypy' },
          ],
        },
        {
          id: 305,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Async/Await (5 puntos)',
          description:
            'Explica asyncio. Implementa funciones async con await, gather, y maneja concurrent requests.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'async/await correctamente' },
            { points: 2, description: 'asyncio.gather para concurrencia' },
            { points: 1, description: 'Diferencia async vs threading' },
          ],
        },
      ],
    },
    {
      id: 'frameworks',
      name: 'Frameworks Web',
      description: 'FastAPI, Django, Flask',
      estimatedTime: '30 minutos',
      totalPoints: 30,
      questions: [
        {
          id: 306,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'FastAPI Básico (6 puntos)',
          description:
            'Crea API REST con FastAPI: endpoints CRUD, Pydantic models, validación automática, documentación Swagger.',
          points: 6,
          sectionId: 'frameworks',
          criteria: [
            { points: 2, description: 'Endpoints con type hints' },
            { points: 2, description: 'Pydantic BaseModel para validación' },
            { points: 2, description: 'Dependency injection' },
          ],
        },
        {
          id: 307,
          level: QuestionLevel.SENIOR,
          title: 'Django ORM (6 puntos)',
          description:
            'Implementa models con relaciones: OneToOne, ForeignKey, ManyToMany. Queries complejas con select_related y prefetch_related.',
          points: 6,
          sectionId: 'frameworks',
          criteria: [
            { points: 2, description: 'Models con relaciones correctas' },
            { points: 2, description: 'Queries optimizadas' },
            { points: 2, description: 'select_related vs prefetch_related' },
          ],
        },
        {
          id: 308,
          level: QuestionLevel.SENIOR,
          title: 'SQLAlchemy (6 puntos)',
          description:
            'Implementa ORM con SQLAlchemy: declarative models, relationships, sessions, migrations con Alembic.',
          points: 6,
          sectionId: 'frameworks',
          criteria: [
            { points: 2, description: 'Declarative base y models' },
            { points: 2, description: 'Relationships configuradas' },
            { points: 2, description: 'Session management y Alembic' },
          ],
        },
        {
          id: 309,
          level: QuestionLevel.SENIOR,
          title: 'Authentication con JWT (6 puntos)',
          description:
            'Implementa autenticación JWT en FastAPI: registro, login, protected routes, OAuth2PasswordBearer.',
          points: 6,
          sectionId: 'frameworks',
          criteria: [
            { points: 2, description: 'Password hashing con passlib' },
            { points: 2, description: 'JWT token generation/validation' },
            { points: 2, description: 'OAuth2PasswordBearer dependency' },
          ],
        },
        {
          id: 310,
          level: QuestionLevel.EXPERT,
          title: 'WebSockets y Async APIs (6 puntos)',
          description:
            'Implementa WebSocket endpoint en FastAPI para chat en tiempo real. Manejo de conexiones múltiples.',
          points: 6,
          sectionId: 'frameworks',
          criteria: [
            { points: 2, description: 'WebSocket endpoint' },
            { points: 2, description: 'Connection manager para múltiples clientes' },
            { points: 2, description: 'Broadcast de mensajes' },
          ],
        },
      ],
    },
    {
      id: 'data',
      name: 'Data Science y ML',
      description: 'Python para análisis de datos',
      estimatedTime: '25 minutos',
      totalPoints: 20,
      questions: [
        {
          id: 311,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Pandas Básico (5 puntos)',
          description:
            'Carga, limpia y transforma datos con Pandas: read_csv, groupby, merge, pivot_table.',
          points: 5,
          sectionId: 'data',
          criteria: [
            { points: 2, description: 'Operaciones de limpieza de datos' },
            { points: 2, description: 'Groupby y agregaciones' },
            { points: 1, description: 'Merge y joins' },
          ],
        },
        {
          id: 312,
          level: QuestionLevel.SENIOR,
          title: 'NumPy Vectorization (5 puntos)',
          description:
            'Explica vectorización. Optimiza código con NumPy arrays vs loops. Broadcasting.',
          points: 5,
          sectionId: 'data',
          criteria: [
            { points: 2, description: 'Vectorización correcta' },
            { points: 2, description: 'Broadcasting explicado' },
            { points: 1, description: 'Performance comparison' },
          ],
        },
        {
          id: 313,
          level: QuestionLevel.SENIOR,
          title: 'Scikit-learn Pipeline (5 puntos)',
          description:
            'Crea pipeline de ML: preprocessing, feature engineering, model training, cross-validation.',
          points: 5,
          sectionId: 'data',
          criteria: [
            { points: 2, description: 'Pipeline con transformers' },
            { points: 2, description: 'Model training y evaluation' },
            { points: 1, description: 'Cross-validation strategy' },
          ],
        },
        {
          id: 314,
          level: QuestionLevel.EXPERT,
          title: 'PySpark Integration (5 puntos)',
          description:
            'Integra Python con Spark: SparkSession, DataFrames, UDFs, optimizaciones.',
          points: 5,
          sectionId: 'data',
          criteria: [
            { points: 2, description: 'SparkSession y DataFrame operations' },
            { points: 2, description: 'UDFs y optimización' },
            { points: 1, description: 'Best practices para big data' },
          ],
        },
      ],
    },
  ],
};
