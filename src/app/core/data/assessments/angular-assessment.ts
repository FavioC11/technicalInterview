import { AssessmentData, QuestionLevel, Section } from '../../models/question.model';

export const ANGULAR_ASSESSMENT: AssessmentData = {
  technologyId: 'angular',
  technologyName: 'Angular',
  sections: [
    {
      id: 'nivel1',
      name: 'Nivel 1: Básico (Junior)',
      description: 'Fundamentos de Angular',
      estimatedTime: '20 minutos',
      totalPoints: 20,
      questions: [
        {
          id: 1,
          level: QuestionLevel.JUNIOR,
          title: 'Componentes y Data Binding (3 puntos)',
          description:
            'Explica la diferencia entre los siguientes tipos de data binding en Angular y proporciona un ejemplo de cada uno:\n\n• Interpolation\n• Property Binding\n• Event Binding\n• Two-way Binding',
          points: 3,
          sectionId: 'nivel1',
          criteria: [
            { points: 1, description: 'Define correctamente cada tipo de binding' },
            { points: 1, description: 'Proporciona ejemplos válidos de sintaxis' },
            { points: 1, description: 'Menciona cuándo usar cada uno' },
          ],
        },
        {
          id: 2,
          level: QuestionLevel.JUNIOR,
          title: 'Directivas Built-in (3 puntos)',
          description: '¿Cuál es la diferencia entre *ngIf y [hidden]? ¿Cuándo usarías cada una?',
          points: 3,
          sectionId: 'nivel1',
          criteria: [
            { points: 1.5, description: '*ngIf remueve/agrega elementos del DOM' },
            { points: 1, description: '[hidden] solo oculta con CSS (display: none)' },
            { points: 0.5, description: 'Menciona implicaciones de rendimiento' },
          ],
        },
        {
          id: 3,
          level: QuestionLevel.JUNIOR,
          title: 'Servicios e Inyección de Dependencias (4 puntos)',
          description:
            'Crea un servicio simple que gestione una lista de tareas (TodoService) con:\n\n• Array de todos (id, title, completed)\n• Métodos: agregar, eliminar, marcar como completado\n• @Injectable configurado correctamente',
          points: 4,
          sectionId: 'nivel1',
          criteria: [
            { points: 1, description: "@Injectable({ providedIn: 'root' })" },
            { points: 1, description: 'Estructura de datos correcta' },
            { points: 2, description: 'Métodos funcionales implementados' },
          ],
        },
        {
          id: 4,
          level: QuestionLevel.JUNIOR,
          title: 'Comunicación entre Componentes (5 puntos)',
          description:
            'Implementa comunicación padre-hijo usando @Input y @Output. El padre envía un nombre al hijo, y el hijo emite un evento al hacer click.',
          points: 5,
          sectionId: 'nivel1',
          criteria: [
            { points: 2, description: '@Input() correctamente implementado' },
            { points: 2, description: '@Output() con EventEmitter' },
            { points: 1, description: 'Template padre suscribe correctamente' },
          ],
        },
        {
          id: 5,
          level: QuestionLevel.JUNIOR,
          title: 'Lifecycle Hooks Básicos (5 puntos)',
          description:
            'Explica cuándo se ejecutan estos lifecycle hooks y proporciona un caso de uso para cada uno:\n\n• ngOnInit\n• ngOnDestroy\n• ngOnChanges',
          points: 5,
          sectionId: 'nivel1',
          criteria: [
            { points: 2, description: 'Describe cuándo se ejecuta cada hook' },
            { points: 2, description: 'Casos de uso válidos' },
            { points: 1, description: 'Menciona orden de ejecución' },
          ],
        },
      ],
    },
    {
      id: 'nivel2',
      name: 'Nivel 2: Intermedio (Semi Senior)',
      description: 'Conocimientos intermedios de Angular',
      estimatedTime: '25 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 6,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Reactive Forms Avanzado (6 puntos)',
          description:
            'Crea un formulario reactivo de registro con validaciones para: email, password (mín 8 chars, mayúscula, número), confirm password (matching), y validador custom para password matching.',
          points: 6,
          sectionId: 'nivel2',
          criteria: [
            { points: 2, description: 'FormGroup con FormBuilder' },
            { points: 2, description: 'Validadores built-in y custom' },
            { points: 1, description: 'Validador custom para matching' },
            { points: 1, description: 'Muestra errores en template' },
          ],
        },
        {
          id: 7,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'RxJS Operadores (6 puntos)',
          description:
            'Explica y proporciona ejemplos de: map vs switchMap, debounceTime + distinctUntilChanged, combineLatest vs forkJoin.',
          points: 6,
          sectionId: 'nivel2',
          criteria: [
            { points: 2, description: 'map transforma vs switchMap cancela observable anterior' },
            {
              points: 2,
              description: 'debounceTime espera, distinctUntilChanged evita duplicados',
            },
            {
              points: 2,
              description: 'combineLatest (todos emiten) vs forkJoin (espera completion)',
            },
          ],
        },
        {
          id: 8,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Routing y Guards (6 puntos)',
          description:
            'Implementa un AuthGuard que verifique autenticación con AuthService, redirija a /login si no está autenticado, y bonus: guarde la URL intentada.',
          points: 6,
          sectionId: 'nivel2',
          criteria: [
            { points: 2, description: 'Implementa CanActivate correctamente' },
            { points: 2, description: 'Inyecta Router y AuthService' },
            { points: 1, description: 'Maneja redirección correctamente' },
            { points: 1, description: 'Guarda returnUrl (bonus)' },
          ],
        },
        {
          id: 9,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'HTTP Interceptor (4 puntos)',
          description:
            'Crea un interceptor que agregue token de autenticación a todas las peticiones HTTP salientes, excepto a /public/*.',
          points: 4,
          sectionId: 'nivel2',
          criteria: [
            { points: 1.5, description: 'Implementa HttpInterceptor interface' },
            { points: 1.5, description: 'Clona request y agrega header' },
            { points: 1, description: 'Verifica URL antes de agregar token' },
          ],
        },
        {
          id: 10,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Custom Pipe (3 puntos)',
          description:
            'Crea un pipe "timeAgo" que convierta una fecha a formato relativo ("hace 5 minutos", "hace 2 horas", "hace 3 días").',
          points: 3,
          sectionId: 'nivel2',
          criteria: [
            { points: 1, description: 'Implementa PipeTransform correctamente' },
            { points: 1, description: 'Calcula diferencia de tiempo' },
            { points: 1, description: 'Retorna string formateado' },
          ],
        },
      ],
    },
    {
      id: 'nivel3',
      name: 'Nivel 3: Avanzado (Senior)',
      description: 'Conocimientos avanzados',
      estimatedTime: '30 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 11,
          level: QuestionLevel.SENIOR,
          title: 'Change Detection Strategy (6 puntos)',
          description:
            'Explica Default vs OnPush. Identifica el problema en este código con OnPush y propón soluciones:',
          codeExample: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<div *ngFor="let item of items">{{ item.name }}</div>\`
})
export class ListComponent {
  items = [{ name: 'Item 1' }];
  addItem() {
    this.items.push({ name: 'Item ' + (this.items.length + 1) });
  }
}`,
          points: 6,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: 'Explica Default vs OnPush' },
            { points: 2, description: 'Identifica mutación de array (misma referencia)' },
            { points: 2, description: 'Solución: nuevo array o ChangeDetectorRef' },
          ],
        },
        {
          id: 12,
          level: QuestionLevel.SENIOR,
          title: 'Memory Leaks y Subscriptions (6 puntos)',
          description:
            'Identifica los memory leaks en este código y proporciona 3 soluciones diferentes:',
          codeExample: `ngOnInit() {
  this.dataService.getData().subscribe(data => {
    this.data$.next(data);
  });
  interval(1000).subscribe(() => console.log('Tick'));
}`,
          points: 6,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: 'Identifica subscripciones sin unsubscribe' },
            {
              points: 4,
              description:
                '3 soluciones: manual + unsubscribe, takeUntil, async pipe, takeUntilDestroyed',
            },
          ],
        },
        {
          id: 13,
          level: QuestionLevel.SENIOR,
          title: 'Hierarchical Dependency Injection (5 puntos)',
          description:
            "Explica cómo funciona la inyección jerárquica. Diferencias entre providedIn: 'root', providers en @Component, y providers en @NgModule. Casos de uso.",
          points: 5,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: "providedIn: 'root' (singleton, tree-shakeable)" },
            { points: 1.5, description: 'providers en Component (nueva instancia)' },
            { points: 1.5, description: 'providers en Module (singleton en módulo)' },
          ],
        },
        {
          id: 14,
          level: QuestionLevel.SENIOR,
          title: 'Optimización con trackBy (4 puntos)',
          description:
            '¿Por qué es importante trackBy con *ngFor? Implementa una función trackBy para una lista de usuarios.',
          points: 4,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: 'Sin trackBy, Angular re-renderiza todos los elementos' },
            { points: 1, description: 'trackBy usa identidad para detectar cambios' },
            { points: 1, description: 'Implementa función correctamente' },
          ],
        },
        {
          id: 15,
          level: QuestionLevel.SENIOR,
          title: 'State Management Pattern (4 puntos)',
          description:
            'Implementa un servicio de estado simple para carrito de compras con estado inmutable, expone como Observable, métodos: addItem, removeItem, clearCart, calcula total automáticamente.',
          points: 4,
          sectionId: 'nivel3',
          criteria: [
            { points: 1, description: 'Usa BehaviorSubject' },
            { points: 1, description: 'Expone solo asObservable()' },
            { points: 2, description: 'Métodos con inmutabilidad' },
          ],
        },
      ],
    },
    {
      id: 'nivel4',
      name: 'Nivel 4: Expert (Senior Avanzado)',
      description: 'Conocimientos expertos',
      estimatedTime: '25 minutos',
      totalPoints: 15,
      questions: [
        {
          id: 16,
          level: QuestionLevel.EXPERT,
          title: 'Arquitectura de Módulos y Lazy Loading (5 puntos)',
          description:
            'Diseña arquitectura de módulos para app empresarial: CoreModule (servicios singleton), SharedModule (componentes reutilizables), Feature Modules con lazy loading, prevención de re-importación del CoreModule.',
          points: 5,
          sectionId: 'nivel4',
          criteria: [
            { points: 1.5, description: 'CoreModule con guard contra re-importación' },
            { points: 1.5, description: 'SharedModule exportando componentes comunes' },
            { points: 2, description: 'Rutas con loadChildren para lazy loading' },
          ],
        },
        {
          id: 17,
          level: QuestionLevel.EXPERT,
          title: 'Custom Structural Directive (5 puntos)',
          description:
            'Crea directiva *appPermission que muestre/oculte contenido basado en permisos de usuario. Uso: <button *appPermission="\'admin\'">Delete</button>',
          points: 5,
          sectionId: 'nivel4',
          criteria: [
            { points: 2, description: 'Directive con TemplateRef y ViewContainerRef' },
            { points: 2, description: '@Input() set para detectar cambios' },
            { points: 1, description: 'Verifica permisos correctamente' },
          ],
        },
        {
          id: 18,
          level: QuestionLevel.EXPERT,
          title: 'ViewChild y ContentChild (5 puntos)',
          description:
            'Explica ViewChild vs ContentChild. Implementa TabsComponent que use ContentChildren para obtener TabComponent hijos y permitir navegación entre tabs.',
          points: 5,
          sectionId: 'nivel4',
          criteria: [
            { points: 1, description: 'Explica ViewChild vs ContentChild' },
            { points: 2, description: '@ContentChildren(TabComponent) correctamente' },
            { points: 2, description: 'Lógica para activar/desactivar tabs' },
          ],
        },
      ],
    },
    {
      id: 'moderno',
      name: 'Angular Moderno (14+)',
      description: 'Características modernas de Angular',
      estimatedTime: '15 minutos',
      totalPoints: 10,
      questions: [
        {
          id: 19,
          level: QuestionLevel.SENIOR,
          title: 'Standalone Components (3 puntos)',
          description:
            'Convierte este componente tradicional a Standalone Component. Incluye standalone: true, mueve imports, y elimina NgModule.',
          points: 3,
          sectionId: 'moderno',
          criteria: [
            { points: 1, description: 'Agrega standalone: true' },
            { points: 1, description: 'Mueve imports al componente' },
            { points: 1, description: 'Elimina NgModule correctamente' },
          ],
        },
        {
          id: 20,
          level: QuestionLevel.SENIOR,
          title: 'Signals (Angular 16+) (4 puntos)',
          description: 'Refactoriza este código de BehaviorSubject a Signals:',
          codeExample: `private count$ = new BehaviorSubject<number>(0);
count = this.count$.asObservable();
increment() { this.count$.next(this.count$.value + 1); }`,
          points: 4,
          sectionId: 'moderno',
          criteria: [
            { points: 2, description: 'Usa signal() para crear señal' },
            { points: 1, description: 'Usa update() o set()' },
            { points: 1, description: 'Menciona beneficios' },
          ],
        },
        {
          id: 21,
          level: QuestionLevel.SENIOR,
          title: 'Control Flow Syntax (Angular 17+) (3 puntos)',
          description: 'Convierte este template a la nueva sintaxis de control flow (@if, @for):',
          codeExample: `<div *ngIf="user; else loading">
  <ul>
    <li *ngFor="let item of user.items; trackBy: trackById">
      {{ item.name }}
    </li>
  </ul>
</div>
<ng-template #loading>Loading...</ng-template>`,
          points: 3,
          sectionId: 'moderno',
          criteria: [
            { points: 1, description: '@if / @else correctamente' },
            { points: 1.5, description: '@for con track correctamente' },
            { points: 0.5, description: 'Sintaxis válida' },
          ],
        },
      ],
    },
    {
      id: 'debugging',
      name: 'Debugging Challenge',
      description: 'Desafío de debugging',
      estimatedTime: '15 minutos',
      totalPoints: 5,
      questions: [
        {
          id: 22,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Encuentra y Corrige Errores (5 puntos)',
          description: 'El siguiente código tiene múltiples errores. Identifica y corrige todos:',
          codeExample: `@Component({
  selector: 'product-list',
  template: \`
    <div *ngFor="let product in products">
      <h3>{{ product.name }}</h3>
      <button (click)="addToCart(product)">Add</button>
    </div>
  \`
})
export class ProductListComponent {
  products: Product[];
  cartItems = 0;
  constructor(private cartService: CartService) {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}`,
          points: 5,
          sectionId: 'debugging',
          criteria: [
            { points: 1, description: '*ngFor usa "of" no "in"' },
            { points: 1, description: "Selector debe incluir 'app-' prefix" },
            { points: 1, description: 'productService no está inyectado' },
            { points: 1, description: 'loadProducts() debe estar en ngOnInit' },
            { points: 1, description: 'products no está inicializado' },
          ],
        },
      ],
    },
  ],
};
