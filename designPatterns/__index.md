# USEFUL TERMINOLOGY

- **Concrete vs Abstract classes**: Concrete classes can be instantiated using the `new` keyword, abstract classes cannot

# CREATIONAL PATTERNS

## Abstract Factory

## Builder

- **USE FOR**: creating complex and diverse objects step-by-step
- **USE CASES**: massive objects, test data generation, immutable objects, parametrized objects etc
- **EXAMPLE**: create an oboarding workflow for new employees that:
  - contains multiple workflows (contract signing, training, testing, vetting, etc)
  - workflow selection depends on contract type and seniority
  - each workflow must be customised based on position, department, team etc;
  - e.g. Training: may contain Budget Management, GDPR, ISMS etc
  - ISMS (Information Security Training) customisation:
  - for the typical employee is quite basic and failing it triggers a retesting workflow and subsequent workflows if needed
  - for SysAdmins is very complex. Failing the training leads to a complex process that may trigger termination, retraining or conversion workflows
  - for senior managers it triggers hardware security workflows instead of training workflows etc
  - SUB-OPTIMAL SOLUTIONS:
  - Hierarcy of classes starting from a top Oboarding class:
    - OnboardingWorkflow: ContractorOnboarding, InternOnboarding, EmployeeOnboarding etc
      - EmployeeOnboarding: SeniorEmployeeOnboarding, JuniorEmployeeOnboarding etc
        - SeniorEmployeeOnboarding: ITSeniorEmployeeOnboarding, FinanceSeniorEmployeeOnboarding etc
          - ITSeniorEmployeeOnboarding: ITInfrastructureSeniorEmployeeOnboarding, ITDevSeniorEmployeeOnboarding etc
  - Superconstructor: OnboardingWowkflow(contractType, seniorityLevel, department, team, position, ...many more params)
  - BUILDER SOLUTION:

```ts
class OnboardingWorkflow {
  private workflows: Array<Workflow> = [];

  addWorkflow(workflow: Workflow): void {
    this.workflows.push(workflow);
  }
}

interface Workflow {
  name: string;
  details: any;
}

class WorkflowBuilder {
  private workflow: OnboardingWorkflow = new OnboardingWorkflow();

  constructor(private position: string) {}

  addWorkflows(workflows: Array<string>): WorkflowBuilder {
    // Simulated data retrieval based on position and associated workflows from a data source (config or database)
    const workflowsForPosition = this.getWorkflowsForPosition(this.position);

    if (workflowsForPosition) {
      workflows.forEach((workflow) => {
        const workflowDetails = workflowsForPosition[workflow];
        if (workflowDetails) {
          this.workflow.addWorkflow({
            name: workflow,
            details: workflowDetails,
          });
        } else {
          console.log(
            `Workflow '${workflow}' not found for position '${this.position}'`
          );
        }
      });
    } else {
      console.log(`No workflows found for position '${this.position}'`);
    }

    return this;
  }

  build(): OnboardingWorkflow {
    return this.workflow;
  }

  // Simulated function to retrieve workflows based on position from a data source
  private getWorkflowsForPosition(
    position: string
  ): Record<string, any> | null {
    // Logic to retrieve workflows for the given position from a configuration file or database
    // Example: Retrieve workflows associated with the provided position
    const workflowsByPosition: Record<string, Record<string, any>> = {
      JuniorDeveloperInfra: {
        ContractSigning: {},
        GDPRTraining: {},
        // ...
      },
      SeniorDeveloperInfra: {
        ContractSigning: {},
        ISMSTraining: {},
        GDPRTraining: {},
        // ...
      },
      // ...
    };

    return workflowsByPosition[position] || null;
  }
}

// USAGE
const position = 'SeniorDeveloperInfra';
const onboardingBuilder = new WorkflowBuilder(position);

// Retrieve workflows associated with the specified position and add them to the builder
// Example: Get workflows for the given position from a data source
const workflowsForPosition = [
  'ContractSigning',
  'ISMSTraining',
  'GDPRTraining' /*many more*/,
];
onboardingBuilder.addWorkflows(workflowsForPosition);

// Build the onboarding workflow for the specified position
const onboardingForSeniorIT = onboardingBuilder.build();
```

## Factory

## Lazy initialisation

- **USE FOR**: Delaying the instantiation of large or resource-intensive objects until they are needed, thus reducing startup time. It is the opposite of Eager initialisation.
- **USE CASES**: Configuration settings, Database connections, Object Pools, Pool elements, Large data structures, External resources (images, files etc)
- **EXAMPLE**: A DatabaseConnection class that only establishes a connection to the database the first time a query is made, not when the object is instantiated.
- **SUBOPTIMAL SOLUTIONS**:
  - Eager initialization of resources that are rarely used or might not be used at all --> memory waste, slow startup
  - Lazy initialization when resources are almost certainly going to be used immediately, which can add unnecessary complexity.
- **BEST PRACTICES**:
  - Ensure thread safety in multi-threaded environments
  - Use existing language features or libraries that support lazy initialization where available
  - Not the best idea to use lazy init on database connections, you should be aware earlier if the connection is broken. Database connection should be eagerly initialised, but the query, which is resource intensive, should be lazily executed

## Object pool

- **USE FOR**: efficiently managing object caching mechanisms. It's beneficial when the cost of initializing a class instance is high, the rate of instantiation is high, and the number of instances in use at any given time is low to moderate.
- **USE CASES**:
  - Database Connection Pools,
  - Thread Pools (in multithreaded applications for managing the task execution threads),
  - Network Connections,
  - Graphic Rendering (in game development or graphic applications, for particles or sprites),
  - Cookie Management,
  - The Context broker from ms-collector
- **EXAMPLE**: Database connection pool: when an application starts, it creates a fixed number of database connections and keeps them in a pool. Whenever a part of the application needs to interact with the database, it borrows a connection from the pool, uses it, and then returns it to the pool for future use instead of creating a new connection each time.
- **SUBOPTIMAL SOLUTIONS**:
  - Creating and Destroying objects as needed - high resource cost of object creation and destruction
  - Singleton Pattern - limited flexibility
- **BEST PRACTICES**:
  - Object Pool Size Management to balance the memory consumption and object availability - Regular Monitoring and Tuning based on the application's usage patterns.
  - Object Lifecycle Management: request --> borrow/reserve --> optional: expiry --> cleanup/reset --> make available
  - Concurrency Handling (thread-safe mechanisms to manage objects for a multi-threaded environment)
  - Resource Limitation: Implement timeouts or other mechanisms to handle scenarios where all objects in the pool are in use, and a request for a new object cannot be immediately satisfied.

## Prototype

- **USE FOR**: Creating new objects by copying an existing object, known as the prototype, without exposing the complexity of their creation process to the client.
- **USE CASES**: Ideal for scenarios where the cost of creating a new instance from scratch is more expensive than copying an existing instance. Particularly useful when dealing with complex objects or objects with intricate initialization processes.
- **EXAMPLE**: Implementing a DocumentPrototype that serves as a template for creating various document types (e.g., 'resume', 'report'). The client can clone this prototype to obtain a new document with the same structure and initial content.
- **SUBOPTIMAL SOLUTIONS**:
  - Manual creation of objects with intricate initialization processes, leading to code duplication and increased risk of errors.
  - Lack of flexibility in creating variations of objects, especially when the initialization process is complex and dynamic.
- **BEST PRACTICES**:
  - Define a common interface for the prototype objects.
  - Implement a clone method in the prototype to facilitate object copying.
  - Ensure that the cloning process is deep enough to avoid unexpected reference-sharing issues.

## Singleton

# STRUCTURAL PATTERNS

## Adapter

- **USE FOR**: The Adapter pattern is used to allow two incompatible interfaces to work together. It acts as a bridge between two otherwise incompatible classes or systems, enabling them to collaborate without changing their existing code.
- **USE CASES**:
  - Integrating new functionality or systems with legacy code.
  - Allowing code written for different interfaces or frameworks to communicate.
  - Making third-party or external systems work with existing codebases.
  - Facilitating communication between objects that have different data formats or protocols.
  - The Monolith Adapter from ranking-adapter
  - Storage Adapters (e.g. Scylla and S3)
- **EXAMPLE**: Integrate the TasksService of Todo App (which has Users, Tasks, Lists) with an external calendar service for scheduling and reminders which uses a different data format for representing dates and tasks.
- **SUBOPTIMAL SOLUTIONS**:
  - Directly modifying one side to make them compatible --> increased coupling, reduced maintainability.
  - Creating multiple versions of the same functionality for different interfaces --> code duplication, increased complexity.
- **BEST PRACTICES**:
  - Ensure that the adapter only contains code necessary for converting interfaces. Avoid adding business logic to the adapter.
  - Use adapters as a temporary solution while planning for a long-term integration strategy.
  - Keep the adapter's interface as simple as possible to ensure ease of use and maintainability.
  - Consider the impact on performance, especially if the adapter is used frequently or involves complex transformations.

## Bridge

## Decorator

## Composer

- **USE FOR**:
- **USE CASES**:
- **SUBOPTIMAL SOLUTIONS**:
- **BEST PRACTICES**:

## Facade

- **USE FOR**: Providing a simplified interface to a complex system or set of interfaces.
- **USE CASES**:
  - Integrating with complex libraries or APIs,
  - Hiding system complexity,
  - Simplifying client usage,
  - Reducing coupling between subsystems
- **EXAMPLE**:

1. Facade.ts: Creating a facade for e-commerce site that relies on multiple services for inventory checks, discounts, ordering etc for placing an order. It makes sense to use a facade, because you need to apply business logic along with those various services. For example, if the customer or product is eligible for a discount, you apply one; if the product is not available immediately, you place a delayed order etc. The client only has acces to orderingServiceFacade.placeOrder() and is is not aware of all that logic or the services behind them.
2. Facade-suboptimal.ts: Offering a unified interface for multiple HTML parsing services for search engines (Google, Bing, Yahoo etc). While technically this implements the Facade pattern, it would be simpler to just use a Promise.all instead of a facade.

- **SUBOPTIMAL SOLUTIONS**:
  - Exposing all internal subsystems directly to the web-client, leading to tight coupling and increased complexity.
  - Requiring clients to coordinate multiple subsystems themselves, resulting in duplicated code and potential errors.
- **BEST PRACTICES**:
  - Define a unified interface that hides the complexity of the subsystems.
  - Encapsulate interactions with subsystems within the facade.
  - Keep the facade simple and focused on specific use cases to avoid becoming overly complex.
  - Use dependency injection to provide flexibility and testability.

## Flyweight

- **USE FOR**: Conserving memory by sharing common state across multiple objects.
- **USE CASES**: Managing large numbers of similar objects efficiently, Reducing memory usage, Optimizing performance, Caching, Text editors, Graphic design software, Game development, Web servers
- **EXAMPLE**:

1. Flyweight.ts: Managing assets in a game. For example, there may be hundreds of instances of one specific type of sword - for example, magic swords. They all share some common properties (shape, texture, animations and other large assets). These are called intrinsic properties and can easily go up to 3-10 megabytes in a typical game, so we don't want to keep hundreds of copies in RAM. Extrinsic properties like price, damage per strike, durability etc are unique for each instance, so we will need to attach them to their respective instances.
2. Flyweight-suboptimal.ts: Managing characters in a text editor. You can create a FlyweightCharacterFactory that makes sure there are no duplicate instances of a character with some specific properties. However, you might end up with 10000 characters in memory, and only 50 used repeatedly, in which case the flyweight is counterproductive. If, however, almost all of these characters would actually be used repeatedly, then the flyweight would pay off. Please note this is a slightly different implementation that only has extrinsic properties. Using a map would be probably simpler for this scenario.

- **SUBOPTIMAL SOLUTIONS**:
  - Creating separate objects for each instance with redundant state information.
  - Storing all state information within each object, leading to excessive memory usage.
- **BEST PRACTICES**:
  - Identify intrinsic and extrinsic state in objects.
  - Share intrinsic state among multiple objects using a flyweight factory.
  - Use flyweight pattern alongside other design patterns like composite or proxy for more complex scenarios.
  - Ensure thread safety and proper synchronization if applicable.

```typescript
class CharacterFlyweight {
  private char: string;
  private font: string;
  private size: number;

  constructor(char: string, font: string, size: number) {
    this.char = char;
    this.font = font;
    this.size = size;
  }

  public display(): void {
    console.log(
      `Character: ${this.char}, Font: ${this.font}, Size: ${this.size}`
    );
  }
}

class CharacterFlyweightFactory {
  private flyweights: { [key: string]: CharacterFlyweight } = {};

  public getCharacter(
    char: string,
    font: string,
    size: number
  ): CharacterFlyweight {
    const key = `${char}-${font}-${size}`;
    if (!this.flyweights[key]) {
      this.flyweights[key] = new CharacterFlyweight(char, font, size);
    }
    return this.flyweights[key];
  }

  public getTotalFlyweights(): number {
    return Object.keys(this.flyweights).length;
  }
}

// Example usage
const factory = new CharacterFlyweightFactory();
const charA = factory.getCharacter('A', 'Arial', 12);
const charB = factory.getCharacter('B', 'Times New Roman', 14);
const charC = factory.getCharacter('A', 'Arial', 12); // Reusing existing flyweight

charA.display(); // Output: Character: A, Font: Arial, Size: 12
charB.display(); // Output: Character: B, Font: Times New Roman, Size: 14
charC.display(); // Output: Character: A, Font: Arial, Size: 12

console.log(
  'Total number of flyweights created:',
  factory.getTotalFlyweights()
); // Output: Total number of flyweights created: 2
```

In this example, the `CharacterFlyweight` class represents the intrinsic state (character, font, size), and the `CharacterFlyweightFactory` manages the creation and sharing of flyweight objects. Clients can request flyweight objects through the factory, and if a flyweight with the same intrinsic state already exists, it is reused instead of creating a new one, thus conserving memory.

## Proxy

- **USE FOR**: Controlling access to an object or adding functionality to it without changing its interface. (a bit like middleware for classes)
- **USE CASES**: Implementing access control, Caching data, Lazy initialization, Logging, Monitoring, TypeORM, Remote proxies, Virtual proxies, Security proxies, Smart references, Throttling
- **EXAMPLE**: Creating a proxy for a sensitive file system resource that restricts access based on user permissions before allowing operations like read or write and logs access.
- **SUBOPTIMAL SOLUTIONS**:
  - Directly exposing sensitive resources to clients, risking unauthorized access and security vulnerabilities.
  - Manually implementing access control logic in each client, leading to code duplication and maintenance overhead
- **BEST PRACTICES**:
  - Implement a proxy class that delegates requests to the real subject while adding extra functionality.
  - Ensure that the proxy and the real subject share a common interface to maintain transparency.
  - Use proxies to encapsulate cross-cutting concerns such as logging and access control, promoting separation of concerns.
  - Consider the performance implications of using proxies, especially in scenarios like remote proxies where network latency may be a factor.

## Mixin

- **USE FOR**: Adding functionality to classes without inheritance, allowing for modular and reusable code composition.
- **USE CASES**: Augmenting classes with additional behavior, Implementing cross-cutting concerns, Code reuse, Avoiding deep inheritance hierarchies, Frameworks, Libraries, Aspect-oriented programming
- **EXAMPLE**: Extending the functionality of different types of shapes in a graphic design application by mixin classes that provide specific behaviors, such as `Resizable`, `Rotatable`, and `Draggable`. These mixins can be applied to various shape classes independently, allowing for flexible combinations of functionality without creating a complex inheritance hierarchy.
- **SUBOPTIMAL SOLUTIONS**:
  - Inheriting from multiple base classes to incorporate additional behavior, leading to the diamond problem and tight coupling.
  - Reimplementing the same functionality in multiple classes, resulting in code duplication and maintenance overhead.
- **BEST PRACTICES**:
  - Define mixins as standalone classes or modules that encapsulate specific behaviors.
  - Apply mixins to classes using composition or decoration, avoiding the limitations of traditional inheritance.
  - Ensure that mixins adhere to the single responsibility principle to maintain code clarity and reusability.
  - Consider the order of mixin application to avoid conflicts and ensure the desired behavior.
- **EXAMPLE**:

```ts
class Resizable {
  resize(): void {
    console.log('Resizing');
  }
}
class Rotatable {
  rotate(): void {
    console.log('Rotating');
  }
}

class Square {
  draw(): void {
    console.log('Drawing Square');
  }
}

applyMixins(Square, [Resizable, Rotatable]);

function applyMixins(derivedConstructor: any, baseConstructors: any[]) {
  baseConstructors.forEach((baseConstructor) => {
    Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name) => {
      derivedConstructor.prototype[name] = baseConstructor.prototype[name];
    });
  });
}

// Example usage
const square = new Square();
square.resize();
square.rotate();
```

## Registry

- **USE FOR**: Centralizing the management and access of objects or services within a system, providing a global point of access and configuration.
- **USE CASES**: Managing global resources, Dependency injection containers, Service locators, Configuration management, Object pooling, Event dispatching, Plugin systems
- **EXAMPLE**: Implementing a Database Registry singleton that centralizes multiple connections, either multiple unique connections to the same database, or connections to different databases etc. You could call this type of multiple connection Singleton a 'Multiton'.
- **SUBOPTIMAL SOLUTIONS**:
  - Hardcoding dependencies within classes, resulting in tight coupling and reduced flexibility.
  - Passing dependencies manually through constructor parameters or method arguments, leading to cumbersome and error-prone code.
- **BEST PRACTICES**:
  - Design the registry to provide a centralized and standardized way to manage and access objects or services.
  - Implement appropriate mechanisms for registering, retrieving, and configuring entries within the registry.
  - Ensure that the registry does not become a global dumping ground for all dependencies, maintaining a clear separation of concerns.
  - Consider using dependency injection alongside the registry pattern to facilitate inversion of control and improve testability.

```ts
class DatabaseRegistry {
  private static connections: Map<string, any> = new Map();

  private constructor() {}

  private static createConnection(key: string): void {
    const connectionOptions = { key /* your db connection config */ };
    const newConnection = YourDBDriver.connect(connectionOptions);
    DatabaseRegistry.connections.set(key, newConnection);
  }

  static getConnection(key: string): any {
    if (!DatabaseRegistry.connections.has(key)) {
      DatabaseRegistry.createConnection(key);
    }
    return DatabaseRegistry.connections.get(key);
  }
}

// Example usage: Retrieve database connections (create if not exist)
const mainConnection = DatabaseRegistry.getConnection('main');
const backupConnection = DatabaseRegistry.getConnection('backup');
```

## Composite

- **USE FOR**: Representing hierarchical tree structures of objects in a uniform manner, allowing clients to treat individual objects and compositions of objects uniformly.
- **USE CASES**: Representing part-whole hierarchies, Treating individual objects and compositions of objects uniformly, Building recursive structures, Implementing recursive algorithms, File systems, GUI components, Organization charts, HTML DOM, Graphic design tools
- **EXAMPLE**: Implementing a graphical user interface where both individual GUI elements (such as buttons and text fields) and composite elements (such as panels and windows) can be treated uniformly. Each GUI element (leaf) and composite element (node) can be part of a larger structure, enabling operations like rendering and event handling to be applied uniformly regardless of the element's complexity.
- **SUBOPTIMAL SOLUTIONS**:
  - Treating individual objects and compositions differently, leading to complex conditional logic and decreased maintainability.
  - Using multiple data structures to represent hierarchical relationships, resulting in code duplication and increased complexity.
- **BEST PRACTICES**:
  - Define a common interface or root abstract class for both leaf and composite objects to ensure uniformity in client interactions.
  - Encapsulate complex hierarchical structures within composite objects, enabling clients to interact with them through a single interface.
  - Utilize recursive algorithms to traverse and manipulate composite structures effectively.
  - Consider using the iterator pattern in conjunction with the composite pattern to traverse composite structures efficiently.
  - On traversal, you need to be aware of the position in the tree so that you don't traverse the same nodes again.

## Marker Interface

- **USE FOR**: Marking classes with specific characteristics or behaviors without adding any methods or properties. Not everyone considers it a design pattern.
- **USE CASES**: Indicating a class's participation in a certain category or capability, Runtime type identification, Serialization, Framework extensibility, Annotation-based frameworks, Aspect-oriented programming.
- **EXAMPLE**: Creating an empty interface NoStackLogs - based on that, a logger will decide what to output from the concrete objects.
- **SUBOPTIMAL SOLUTIONS**:
  - Using boolean flags or attributes to indicate class characteristics, leading to cluttered code and potential inconsistencies.
  - Implementing dummy methods or properties in marker interfaces, violating the principle of interface segregation and introducing unnecessary complexity.
- **BEST PRACTICES**:
  - Use decorators instead (Javascript, TypeScript), or Annotations ()Java)

# BEHAVIORAL PATTERNS

## Iterator

## Mediator

## Observer

## Visitor

## Commander

## Responsibility Chain

## Memento

## State

## Strategy

## Template

## Broker

## Repository
