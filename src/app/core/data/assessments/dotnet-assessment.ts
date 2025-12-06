import { AssessmentData, QuestionLevel, Section } from '../../models/question.model';

export const DOTNET_ASSESSMENT: AssessmentData = {
  technologyId: 'dotnet',
  technologyName: '.NET & C#',
  sections: [
    {
      id: 'nivel1',
      name: 'Nivel 1: Básico (Junior)',
      description: 'Fundamentos de .NET y C#',
      estimatedTime: '20 minutos',
      totalPoints: 20,
      questions: [
        {
          id: 1,
          level: QuestionLevel.JUNIOR,
          title: 'Tipos de Datos y Variables (3 puntos)',
          description:
            'Explica la diferencia entre los siguientes conceptos en C# y proporciona un ejemplo de cada uno:\n\n• Value Types vs Reference Types\n• var vs tipo explícito\n• Nullable types (int?)\n• const vs readonly',
          points: 3,
          sectionId: 'nivel1',
          criteria: [
            { points: 1, description: 'Diferencia value vs reference types correctamente' },
            { points: 1, description: 'Explica var y nullable types' },
            { points: 1, description: 'Diferencia const vs readonly' },
          ],
        },
        {
          id: 2,
          level: QuestionLevel.JUNIOR,
          title: 'LINQ Básico (3 puntos)',
          description:
            'Dada una lista de productos, escribe queries LINQ para:\n\n• Filtrar productos con precio > 100\n• Ordenar por nombre\n• Obtener solo los nombres de productos\n• Contar productos en stock',
          points: 3,
          sectionId: 'nivel1',
          criteria: [
            { points: 1, description: 'Usa Where() correctamente' },
            { points: 1, description: 'Usa OrderBy() y Select()' },
            { points: 1, description: 'Usa Count() o agregaciones' },
          ],
        },
        {
          id: 3,
          level: QuestionLevel.JUNIOR,
          title: 'Controladores ASP.NET Core (4 puntos)',
          description:
            'Crea un controlador ProductController con:\n\n• Ruta base /api/products\n• Endpoint GET para listar productos\n• Endpoint POST para crear producto\n• Retornar códigos de estado apropiados (200, 201, 400)',
          points: 4,
          sectionId: 'nivel1',
          criteria: [
            { points: 1, description: '[ApiController] y [Route] correctos' },
            { points: 1.5, description: 'GET con ActionResult<T>' },
            { points: 1.5, description: 'POST con validación y CreatedAtAction' },
          ],
        },
        {
          id: 4,
          level: QuestionLevel.JUNIOR,
          title: 'DTOs y Model Binding (5 puntos)',
          description:
            'Crea un DTO CreateProductRequest con validaciones usando Data Annotations:\n\n• Name (requerido, máx 100 caracteres)\n• Price (mayor a 0)\n• Email (formato válido)\n• Explica por qué usar DTOs en lugar de entidades directamente',
          points: 5,
          sectionId: 'nivel1',
          criteria: [
            { points: 2, description: 'Data Annotations correctas ([Required], [Range])' },
            { points: 1, description: 'Validación de email ([EmailAddress])' },
            { points: 2, description: 'Explica ventajas de DTOs (seguridad, desacoplamiento)' },
          ],
        },
        {
          id: 5,
          level: QuestionLevel.JUNIOR,
          title: 'Inyección de Dependencias Básica (5 puntos)',
          description:
            'Explica la diferencia entre los ciclos de vida de servicios y cuándo usar cada uno:\n\n• Transient\n• Scoped\n• Singleton\n\nProporciona un ejemplo de registro de servicio en Program.cs',
          points: 5,
          sectionId: 'nivel1',
          criteria: [
            { points: 2, description: 'Explica cada ciclo de vida correctamente' },
            { points: 2, description: 'Casos de uso apropiados para cada uno' },
            { points: 1, description: 'Sintaxis correcta en Program.cs' },
          ],
        },
      ],
    },
    {
      id: 'nivel2',
      name: 'Nivel 2: Intermedio (Semi Senior)',
      description: 'Entity Framework Core y Patrones',
      estimatedTime: '25 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 6,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Entity Framework Core - Configuración (6 puntos)',
          description:
            'Configura una entidad Product con Fluent API en OnModelCreating:\n\n• Primary Key\n• Propiedad Name requerida, máximo 200 caracteres\n• Índice único en SKU\n• Relación 1-N con Category\n• Propiedad calculada (no mapeada)',
          points: 6,
          sectionId: 'nivel2',
          criteria: [
            { points: 2, description: 'HasKey(), IsRequired(), HasMaxLength()' },
            { points: 2, description: 'HasIndex() con IsUnique()' },
            { points: 1, description: 'HasOne().WithMany() correctamente' },
            { points: 1, description: 'Ignore() para propiedades no mapeadas' },
          ],
        },
        {
          id: 7,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Async/Await y Task (6 puntos)',
          description:
            'Explica y corrige los problemas en este código:\n\n```csharp\npublic async Task<Product> GetProductAsync(int id)\n{\n    var product = _context.Products.FirstOrDefault(p => p.Id == id);\n    return product;\n}\n```\n\n¿Qué está mal? Proporciona la versión correcta y explica por qué.',
          points: 6,
          sectionId: 'nivel2',
          criteria: [
            {
              points: 3,
              description: 'Identifica que usa FirstOrDefault en lugar de FirstOrDefaultAsync',
            },
            { points: 2, description: 'Falta await en la llamada asíncrona' },
            { points: 1, description: 'Proporciona código corregido' },
          ],
        },
        {
          id: 8,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Middleware Personalizado (6 puntos)',
          description:
            'Crea un middleware que:\n\n• Registre cada petición HTTP (método, ruta, duración)\n• Capture excepciones y retorne error JSON consistente\n• Agregue un header personalizado a todas las respuestas\n• Regístralo en Program.cs',
          points: 6,
          sectionId: 'nivel2',
          criteria: [
            { points: 2, description: 'Implementa InvokeAsync correctamente' },
            { points: 2, description: 'Try-catch con manejo de excepciones' },
            { points: 1, description: 'Mide tiempo con Stopwatch' },
            { points: 1, description: 'app.UseMiddleware<T>() en Program.cs' },
          ],
        },
        {
          id: 9,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'Repository Pattern (4 puntos)',
          description:
            'Implementa un IRepository<T> genérico con:\n\n• GetByIdAsync\n• GetAllAsync\n• AddAsync\n• UpdateAsync\n• DeleteAsync\n\nImplementa la clase concreta usando Entity Framework Core.',
          points: 4,
          sectionId: 'nivel2',
          criteria: [
            { points: 1.5, description: 'Interface genérica con constraint where T : class' },
            { points: 1.5, description: 'Implementación con DbSet<T>' },
            { points: 1, description: 'Métodos async correctos' },
          ],
        },
        {
          id: 10,
          level: QuestionLevel.SEMI_SENIOR,
          title: 'JWT Authentication (3 puntos)',
          description:
            'Implementa un método que genere un JWT token con:\n\n• Claims (UserId, Email, Role)\n• Expiración de 1 hora\n• Firma con clave secreta\n• Usa System.IdentityModel.Tokens.Jwt',
          points: 3,
          sectionId: 'nivel2',
          criteria: [
            { points: 1, description: 'Crea claims correctamente' },
            { points: 1, description: 'SigningCredentials con HmacSha256' },
            { points: 1, description: 'JwtSecurityTokenHandler().WriteToken()' },
          ],
        },
      ],
    },
    {
      id: 'nivel3',
      name: 'Nivel 3: Avanzado (Senior)',
      description: 'Clean Architecture y CQRS',
      estimatedTime: '30 minutos',
      totalPoints: 25,
      questions: [
        {
          id: 11,
          level: QuestionLevel.SENIOR,
          title: 'Clean Architecture - Capas (6 puntos)',
          description:
            'Explica el propósito de cada capa en Clean Architecture y qué va en cada una:\n\n• Domain\n• Application\n• Infrastructure\n• API/Presentation\n\n¿Qué capa puede referenciar qué? Dibuja el diagrama de dependencias.',
          points: 6,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: 'Explica Domain (Entities, Value Objects, Interfaces)' },
            { points: 2, description: 'Application (Use Cases, DTOs, CQRS)' },
            {
              points: 2,
              description: 'Infrastructure (EF, Repositories) y API (Controllers)',
            },
          ],
        },
        {
          id: 12,
          level: QuestionLevel.SENIOR,
          title: 'CQRS con MediatR (6 puntos)',
          description:
            'Implementa un Command y Query usando MediatR:\n\n• CreateProductCommand con validator\n• GetProductByIdQuery\n• Handlers correspondientes\n• Integración en controller',
          codeExample: `public class CreateProductCommand : IRequest<int>
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}`,
          points: 6,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: 'Command implementa IRequest<T>' },
            { points: 2, description: 'Handler implementa IRequestHandler<TRequest, TResponse>' },
            {
              points: 2,
              description: 'Validator con FluentValidation y PipelineBehavior',
            },
          ],
        },
        {
          id: 13,
          level: QuestionLevel.SENIOR,
          title: 'Domain-Driven Design - Entities vs Value Objects (5 puntos)',
          description:
            '¿Cuál es la diferencia entre Entity y Value Object en DDD?\n\nImplementa:\n• Una Entity (Product con Id)\n• Un Value Object (Money con Amount y Currency)\n• Explica cuándo usar cada uno',
          points: 5,
          sectionId: 'nivel3',
          criteria: [
            { points: 2, description: 'Entity tiene identidad (Id), Value Object no' },
            {
              points: 2,
              description: 'Value Object es inmutable y compara por valor',
            },
            { points: 1, description: 'Implementa Equals() en Value Object' },
          ],
        },
        {
          id: 14,
          level: QuestionLevel.SENIOR,
          title: 'N+1 Query Problem (4 puntos)',
          description:
            'Identifica el problema N+1 en este código y proporciona 2 soluciones:\n\n```csharp\nvar categories = await _context.Categories.ToListAsync();\nforeach(var cat in categories)\n{\n    var products = await _context.Products\n        .Where(p => p.CategoryId == cat.Id)\n        .ToListAsync();\n}\n```',
          points: 4,
          sectionId: 'nivel3',
          criteria: [
            { points: 1, description: 'Identifica N+1: 1 query + N queries en loop' },
            { points: 1.5, description: 'Solución 1: Include() / ThenInclude()' },
            { points: 1.5, description: 'Solución 2: Projection con Select()' },
          ],
        },
        {
          id: 15,
          level: QuestionLevel.SENIOR,
          title: 'Unit Testing con Moq (4 puntos)',
          description:
            'Escribe un unit test para un service que usa repository:\n\n• Mockea el IRepository<Product>\n• Setup del método GetByIdAsync\n• Verifica que se llamó exactamente una vez\n• Usa FluentAssertions para asserts',
          points: 4,
          sectionId: 'nivel3',
          criteria: [
            { points: 1.5, description: 'Mock<IRepository<Product>>()' },
            { points: 1.5, description: 'Setup con Returns() o ReturnsAsync()' },
            { points: 1, description: 'Verify(x => x.Method(), Times.Once)' },
          ],
        },
      ],
    },
    {
      id: 'nivel4',
      name: 'Nivel 4: Expert (Senior Avanzado)',
      description: 'Azure, Microservicios y Performance',
      estimatedTime: '25 minutos',
      totalPoints: 15,
      questions: [
        {
          id: 16,
          level: QuestionLevel.EXPERT,
          title: 'Azure Service Bus - Mensajería (5 puntos)',
          description:
            'Implementa:\n\n• Publisher que envíe mensaje a Queue\n• Consumer que procese mensajes\n• Manejo de Dead Letter Queue\n• Retry policy\n• Usa Azure.Messaging.ServiceBus',
          points: 5,
          sectionId: 'nivel4',
          criteria: [
            { points: 2, description: 'ServiceBusClient y ServiceBusSender' },
            { points: 2, description: 'ServiceBusProcessor con ProcessMessageAsync' },
            { points: 1, description: 'Manejo de errores y DeadLetterMessageAsync' },
          ],
        },
        {
          id: 17,
          level: QuestionLevel.EXPERT,
          title: 'Caching con Redis (5 puntos)',
          description:
            'Implementa un servicio de caché con Redis:\n\n• Método GetOrSetAsync<T> genérico\n• Serialización JSON\n• Expiración configurable\n• Cache-Aside pattern\n• Usa IDistributedCache',
          points: 5,
          sectionId: 'nivel4',
          criteria: [
            { points: 2, description: 'GetAsync() + SetAsync() correctamente' },
            {
              points: 2,
              description: 'Serializa/deserializa con JsonSerializer',
            },
            { points: 1, description: 'DistributedCacheEntryOptions con AbsoluteExpiration' },
          ],
        },
        {
          id: 18,
          level: QuestionLevel.EXPERT,
          title: 'Resiliencia con Polly (5 puntos)',
          description:
            'Configura políticas de resiliencia para HttpClient:\n\n• Retry con exponential backoff (3 intentos)\n• Circuit Breaker (falla después de 5 errores consecutivos)\n• Timeout de 10 segundos\n• Usa Microsoft.Extensions.Http.Resilience',
          points: 5,
          sectionId: 'nivel4',
          criteria: [
            {
              points: 2,
              description: 'AddRetryPolicy con BackoffType.Exponential',
            },
            { points: 2, description: 'AddCircuitBreakerPolicy con parámetros' },
            { points: 1, description: 'AddTimeoutPolicy correctamente' },
          ],
        },
      ],
    },
    {
      id: 'moderno',
      name: '.NET Moderno (8+)',
      description: 'Características modernas de .NET',
      estimatedTime: '15 minutos',
      totalPoints: 10,
      questions: [
        {
          id: 19,
          level: QuestionLevel.SENIOR,
          title: 'Minimal APIs (3 puntos)',
          description:
            'Convierte este controller tradicional a Minimal API:\n\n```csharp\n[ApiController]\n[Route("api/products")]\npublic class ProductsController\n{\n    [HttpGet("{id}")]\n    public async Task<IResult> Get(int id) { }\n}\n```',
          points: 3,
          sectionId: 'moderno',
          criteria: [
            { points: 1.5, description: 'app.MapGet("/api/products/{id}", ...)' },
            { points: 1, description: 'Usa IResult (Results.Ok, Results.NotFound)' },
            { points: 0.5, description: 'Inyecta dependencias en parámetros' },
          ],
        },
        {
          id: 20,
          level: QuestionLevel.SENIOR,
          title: 'Record Types y Pattern Matching (4 puntos)',
          description:
            'Refactoriza este código usando records y pattern matching:\n\n```csharp\nif (product.Status == "Active" && product.Stock > 0)\n    return "Available";\nelse if (product.Status == "Active" && product.Stock == 0)\n    return "Out of Stock";\nelse\n    return "Unavailable";\n```',
          points: 4,
          sectionId: 'moderno',
          criteria: [
            { points: 2, description: 'Usa record para Product' },
            { points: 2, description: 'Switch expression con pattern matching' },
          ],
        },
        {
          id: 21,
          level: QuestionLevel.SENIOR,
          title: 'Primary Constructors (C# 12) (3 puntos)',
          description:
            'Convierte esta clase a usar Primary Constructor:\n\n```csharp\npublic class ProductService\n{\n    private readonly IRepository _repo;\n    private readonly ILogger _logger;\n    \n    public ProductService(IRepository repo, ILogger logger)\n    {\n        _repo = repo;\n        _logger = logger;\n    }\n}\n```',
          points: 3,
          sectionId: 'moderno',
          criteria: [
            { points: 2, description: 'Usa sintaxis: public class ProductService(params)' },
            { points: 1, description: 'Elimina campos y constructor manual' },
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
          codeExample: `[ApiController]
[Route("products")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductController()
    {
        _context = new ApplicationDbContext();
    }

    [HttpGet]
    public List<Product> GetAll()
    {
        var products = _context.Products.ToList();
        return products;
    }

    [HttpPost]
    public void Create(Product product)
    {
        _context.Products.Add(product);
    }
}`,
          points: 5,
          sectionId: 'debugging',
          criteria: [
            { points: 1, description: 'Ruta debe ser /api/products' },
            { points: 1, description: '_context debe inyectarse, no instanciarse' },
            { points: 1, description: 'GetAll debe ser async Task<ActionResult<List>>' },
            { points: 1, description: 'Create debe llamar SaveChangesAsync()' },
            { points: 1, description: 'Create debe retornar CreatedAtAction' },
          ],
        },
      ],
    },
  ],
};
