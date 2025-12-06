import { AssessmentData, QuestionLevel } from '../../models/question.model';

export const SPARK_ASSESSMENT: AssessmentData = {
  technologyId: 'spark',
  technologyName: 'Apache Spark',
  sections: [
    {
      id: 'fundamentals',
      name: 'Fundamentos de Spark',
      description: 'Arquitectura y conceptos core',
      estimatedTime: '30 minutos',
      totalPoints: 30,
      questions: [
        {
          id: 401,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Arquitectura de Spark (6 puntos)',
          description:
            'Explica la arquitectura de Spark: Driver, Executors, Cluster Manager. ¿Qué son las transformaciones y acciones? Lazy evaluation.',
          points: 6,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Driver y Executors explicados' },
            { points: 2, description: 'Transformaciones vs acciones' },
            { points: 2, description: 'Lazy evaluation y DAG' },
          ],
        },
        {
          id: 402,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'RDD vs DataFrame vs Dataset (6 puntos)',
          description:
            'Compara RDD, DataFrame y Dataset. ¿Cuándo usar cada uno? Ventajas de Catalyst Optimizer.',
          points: 6,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Diferencias entre RDD, DF, Dataset' },
            { points: 2, description: 'Type safety y optimización' },
            { points: 2, description: 'Catalyst y Tungsten' },
          ],
        },
        {
          id: 403,
          level: QuestionLevel.SENIOR,
          title: 'Transformations Wide vs Narrow (6 puntos)',
          description:
            'Explica transformaciones narrow vs wide. ¿Qué es un shuffle? Identifica shuffles en: groupBy, join, reduceByKey.',
          points: 6,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Narrow transformations (map, filter)' },
            { points: 2, description: 'Wide transformations y shuffle' },
            { points: 2, description: 'Impacto en performance' },
          ],
        },
        {
          id: 404,
          level: QuestionLevel.SENIOR,
          title: 'Partitioning Strategy (6 puntos)',
          description:
            'Explica partitioning en Spark. Hash vs Range partitioning. ¿Cuándo usar repartition vs coalesce?',
          points: 6,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Hash vs Range partitioning' },
            { points: 2, description: 'repartition vs coalesce' },
            { points: 2, description: 'Custom partitioners' },
          ],
        },
        {
          id: 405,
          level: QuestionLevel.SENIOR,
          title: 'Caching y Persistence (6 puntos)',
          description:
            'Explica niveles de persistencia: MEMORY_ONLY, MEMORY_AND_DISK, DISK_ONLY, etc. ¿Cuándo cachear?',
          points: 6,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Niveles de storage correctos' },
            { points: 2, description: 'Cache vs persist' },
            { points: 2, description: 'Estrategias de caching' },
          ],
        },
      ],
    },
    {
      id: 'dataframes',
      name: 'DataFrames y SQL',
      description: 'Procesamiento con Spark SQL',
      estimatedTime: '30 minutos',
      totalPoints: 30,
      questions: [
        {
          id: 406,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'DataFrame Operations (6 puntos)',
          description:
            'Implementa operaciones: select, filter, groupBy, agg, join, window functions. Resuelve caso de análisis de datos.',
          points: 6,
          sectionId: 'dataframes',
          criteria: [
            { points: 2, description: 'Operaciones básicas correctas' },
            { points: 2, description: 'Agregaciones complejas' },
            { points: 2, description: 'Window functions' },
          ],
        },
        {
          id: 407,
          level: QuestionLevel.SENIOR,
          title: 'Joins Optimization (6 puntos)',
          description:
            'Explica tipos de joins. Broadcast join vs shuffle join. ¿Cuándo usar cada uno? Skew handling.',
          points: 6,
          sectionId: 'dataframes',
          criteria: [
            { points: 2, description: 'Inner, outer, left, right joins' },
            { points: 2, description: 'Broadcast join para tablas pequeñas' },
            { points: 2, description: 'Manejo de data skew' },
          ],
        },
        {
          id: 408,
          level: QuestionLevel.SENIOR,
          title: 'UDFs y Performance (6 puntos)',
          description:
            'Crea UDFs en Scala/Python. ¿Por qué las UDFs afectan performance? Alternativas con built-in functions.',
          points: 6,
          sectionId: 'dataframes',
          criteria: [
            { points: 2, description: 'UDF implementation' },
            { points: 2, description: 'Performance overhead explicado' },
            { points: 2, description: 'Alternativas con built-in functions' },
          ],
        },
        {
          id: 409,
          level: QuestionLevel.EXPERT,
          title: 'Spark SQL Optimization (6 puntos)',
          description:
            'Optimiza queries: predicate pushdown, column pruning, partition pruning. Analiza query plan.',
          points: 6,
          sectionId: 'dataframes',
          criteria: [
            { points: 2, description: 'Predicate pushdown' },
            { points: 2, description: 'Column y partition pruning' },
            { points: 2, description: 'Análisis de explain plan' },
          ],
        },
        {
          id: 410,
          level: QuestionLevel.EXPERT,
          title: 'Delta Lake / Iceberg (6 puntos)',
          description:
            'Explica table formats: Delta Lake, Iceberg. ACID transactions, time travel, schema evolution.',
          points: 6,
          sectionId: 'dataframes',
          criteria: [
            { points: 2, description: 'ACID en data lakes' },
            { points: 2, description: 'Time travel queries' },
            { points: 2, description: 'Schema evolution' },
          ],
        },
      ],
    },
    {
      id: 'streaming',
      name: 'Spark Streaming',
      description: 'Procesamiento en tiempo real',
      estimatedTime: '25 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 411,
          level: QuestionLevel.SENIOR,
          title: 'Structured Streaming (6 puntos)',
          description:
            'Implementa streaming job: lee de Kafka, procesa con window, escribe a sink. Checkpointing.',
          points: 6,
          sectionId: 'streaming',
          criteria: [
            { points: 2, description: 'Kafka source configuration' },
            { points: 2, description: 'Window operations (tumbling, sliding)' },
            { points: 2, description: 'Checkpointing y fault tolerance' },
          ],
        },
        {
          id: 412,
          level: QuestionLevel.SENIOR,
          title: 'Watermarking (6 puntos)',
          description:
            'Explica watermarking. ¿Cómo manejar late data? Event time vs processing time.',
          points: 6,
          sectionId: 'streaming',
          criteria: [
            { points: 2, description: 'Watermarking para late data' },
            { points: 2, description: 'Event time vs processing time' },
            { points: 2, description: 'withWatermark implementation' },
          ],
        },
        {
          id: 413,
          level: QuestionLevel.EXPERT,
          title: 'Stateful Streaming (7 puntos)',
          description:
            'Implementa stateful operations: mapGroupsWithState, flatMapGroupsWithState. Session windows.',
          points: 7,
          sectionId: 'streaming',
          criteria: [
            { points: 2, description: 'mapGroupsWithState correcto' },
            { points: 3, description: 'State management y timeout' },
            { points: 2, description: 'Session windows' },
          ],
        },
        {
          id: 414,
          level: QuestionLevel.EXPERT,
          title: 'Performance Tuning (6 puntos)',
          description:
            'Optimiza Spark job: memory tuning, parallelism, serialization, GC tuning. Métricas clave.',
          points: 6,
          sectionId: 'streaming',
          criteria: [
            { points: 2, description: 'Memory configuration (executor, driver)' },
            { points: 2, description: 'Parallelism y partitioning' },
            { points: 2, description: 'Serialization (Kryo) y monitoring' },
          ],
        },
      ],
    },
  ],
};
