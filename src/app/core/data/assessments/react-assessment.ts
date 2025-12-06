import { AssessmentData, QuestionLevel } from '../../models/question.model';

export const REACT_ASSESSMENT: AssessmentData = {
  technologyId: 'react',
  technologyName: 'React',
  sections: [
    {
      id: 'fundamentals',
      name: 'Fundamentos de React',
      description: 'Conceptos básicos de React',
      estimatedTime: '25 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 101,
          level: QuestionLevel.JUNIOR,
          title: 'JSX y Virtual DOM (5 puntos)',
          description:
            '¿Qué es JSX? ¿Cómo funciona el Virtual DOM en React? ¿Qué ventajas ofrece comparado con manipular el DOM directamente?',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Explica JSX como sintaxis de JavaScript' },
            { points: 2, description: 'Describe el Virtual DOM y reconciliación' },
            { points: 1, description: 'Menciona beneficios de rendimiento' },
          ],
        },
        {
          id: 102,
          level: QuestionLevel.JUNIOR,
          title: 'Componentes y Props (5 puntos)',
          description:
            'Crea un componente funcional UserCard que reciba props: name, email, avatar. Incluye PropTypes o TypeScript para validación.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Componente funcional correctamente definido' },
            { points: 2, description: 'Destructuring de props' },
            { points: 1, description: 'PropTypes o TypeScript interface' },
          ],
        },
        {
          id: 103,
          level: QuestionLevel.JUNIOR,
          title: 'State con useState (5 puntos)',
          description:
            'Implementa un contador con useState que incremente, decremente y resetee el valor. Explica las reglas de los hooks.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'useState implementado correctamente' },
            { points: 2, description: 'Funciones de actualización' },
            { points: 1, description: 'Menciona reglas de hooks' },
          ],
        },
        {
          id: 104,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'useEffect y Ciclo de Vida (5 puntos)',
          description:
            'Explica useEffect. Implementa un componente que haga fetch de datos al montar, limpie subscripciones, y maneje dependencias correctamente.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'useEffect con array de dependencias' },
            { points: 2, description: 'Cleanup function' },
            { points: 1, description: 'Manejo de llamadas API' },
          ],
        },
        {
          id: 105,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Lifting State Up (5 puntos)',
          description:
            'Diseña dos componentes hermanos que compartan estado. Explica el patrón "lifting state up" y cuándo usarlo.',
          points: 5,
          sectionId: 'fundamentals',
          criteria: [
            { points: 2, description: 'Estado elevado al padre común' },
            { points: 2, description: 'Props y callbacks correctamente pasados' },
            { points: 1, description: 'Explica cuándo usar este patrón' },
          ],
        },
      ],
    },
    {
      id: 'advanced',
      name: 'React Avanzado',
      description: 'Hooks avanzados y optimización',
      estimatedTime: '30 minutos',
      totalPoints: 30,
      questions: [
        {
          id: 106,
          level: QuestionLevel.SENIOR,
          title: 'useContext y Context API (6 puntos)',
          description:
            'Implementa un ThemeContext que provea tema (light/dark) y función para cambiarlo. Incluye Provider y custom hook useTheme.',
          points: 6,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'createContext correctamente' },
            { points: 2, description: 'Provider con value' },
            { points: 2, description: 'Custom hook useTheme' },
          ],
        },
        {
          id: 107,
          level: QuestionLevel.SENIOR,
          title: 'useMemo y useCallback (6 puntos)',
          description:
            'Explica cuándo usar useMemo vs useCallback. Proporciona ejemplos de optimización. ¿Qué problemas resuelven?',
          points: 6,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'useMemo para valores calculados' },
            { points: 2, description: 'useCallback para funciones memoizadas' },
            { points: 2, description: 'Ejemplos de prevención de re-renders' },
          ],
        },
        {
          id: 108,
          level: QuestionLevel.SENIOR,
          title: 'Custom Hooks (6 puntos)',
          description:
            'Crea un custom hook useLocalStorage que sincronice estado con localStorage, maneje errores, y actualice cuando cambie en otra pestaña.',
          points: 6,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Hook reutilizable con useState' },
            { points: 2, description: 'Sincronización con localStorage' },
            { points: 2, description: 'Listener para storage events' },
          ],
        },
        {
          id: 109,
          level: QuestionLevel.SENIOR,
          title: 'React.memo y Optimización (6 puntos)',
          description:
            'Explica React.memo. Identifica por qué este componente se re-renderiza innecesariamente y optimízalo.',
          codeExample: `const ExpensiveList = ({ items, onItemClick }) => {
  console.log('Rendering list');
  return items.map(item => (
    <div onClick={() => onItemClick(item.id)}>{item.name}</div>
  ));
};`,
          points: 6,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Identifica re-renders por props functions' },
            { points: 2, description: 'Usa React.memo correctamente' },
            { points: 2, description: 'useCallback para onItemClick' },
          ],
        },
        {
          id: 110,
          level: QuestionLevel.EXPERT,
          title: 'useReducer y State Complejo (6 puntos)',
          description:
            'Implementa un formulario complejo con useReducer que maneje múltiples campos, validaciones, y estado de submit.',
          points: 6,
          sectionId: 'advanced',
          criteria: [
            { points: 2, description: 'Reducer con diferentes actions' },
            { points: 2, description: 'Estado normalizado' },
            { points: 2, description: 'Dispatch para actualizar campos' },
          ],
        },
      ],
    },
    {
      id: 'ecosystem',
      name: 'Ecosistema React',
      description: 'Librerías y herramientas',
      estimatedTime: '20 minutos',
      totalPoints: 20,
      questions: [
        {
          id: 111,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'React Router (5 puntos)',
          description:
            'Configura routing con React Router v6: rutas anidadas, parámetros dinámicos, rutas protegidas, y navegación programática.',
          points: 5,
          sectionId: 'ecosystem',
          criteria: [
            { points: 2, description: 'BrowserRouter y Routes/Route' },
            { points: 2, description: 'useParams y useNavigate' },
            { points: 1, description: 'Rutas protegidas con componente wrapper' },
          ],
        },
        {
          id: 112,
          level: QuestionLevel.SENIOR,
          title: 'State Management (5 puntos)',
          description:
            'Compara Context API, Redux, Zustand. ¿Cuándo usar cada uno? Ventajas y desventajas.',
          points: 5,
          sectionId: 'ecosystem',
          criteria: [
            { points: 2, description: 'Context API para estado simple/temático' },
            { points: 2, description: 'Redux para apps grandes con middleware' },
            { points: 1, description: 'Menciona alternativas modernas (Zustand, Jotai)' },
          ],
        },
        {
          id: 113,
          level: QuestionLevel.SENIOR,
          title: 'React Query / SWR (5 puntos)',
          description:
            'Explica el concepto de server state management. Implementa fetching con cache, revalidación y estados de loading/error.',
          points: 5,
          sectionId: 'ecosystem',
          criteria: [
            { points: 2, description: 'Diferencia client state vs server state' },
            { points: 2, description: 'useQuery o useSWR correctamente' },
            { points: 1, description: 'Cache y revalidación automática' },
          ],
        },
        {
          id: 114,
          level: QuestionLevel.EXPERT,
          title: 'Server Components (React 18+) (5 puntos)',
          description:
            'Explica React Server Components. ¿Qué problemas resuelven? Diferencias con SSR tradicional.',
          points: 5,
          sectionId: 'ecosystem',
          criteria: [
            { points: 2, description: 'Server vs Client Components' },
            { points: 2, description: 'Beneficios: bundle size, data fetching' },
            { points: 1, description: 'Casos de uso apropiados' },
          ],
        },
      ],
    },
  ],
};
