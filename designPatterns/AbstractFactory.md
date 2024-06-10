## Abstract Factory
* __USE FOR__: Creating families of related or dependent objects without specifying their concrete classes. Best fit in situations where you have a matrix of classes (multiple families of products, as opposed to a single family, like in the Factory pattern). For example N car brands each with M car parts would create a matrix of NxM classes:
|           | Door      | Roof      | Windshield | etc...
|-----------|-----------|-----------|------------|-------
| Tesla     | TeslaDoor | TeslaRoof | etc..           --> The Tesla family of products
| Honda     | HondaDoor | HondaRoof | etc..           --> The Honda family of products
| Mazda     | MazdaDoor | MazdaRoof | etc..           --> The Mazda family of products
| etc...    | etc...    | etc...    | etc..
* __USE CASES__: UI/UX components for different platforms, Different types of objects with common themes, Cross-platform compatibility in software applications.
* __EXAMPLE__: Creating different types of tasks (UrgentWorkTask, NormalWorkTask, UrgentHomeTask, NormalHomeTask) with common interfaces but varied implementations based on task type and priority.
* __VARIATIONS__: Abstract factories can created in various ways: from a class, an interface, a mixin, modular etc - see examples
* __SUBOPTIMAL SOLUTIONS__:
    - Using multiple factory methods without a unifying interface, leading to an increase in complexity and maintenance difficulty.
    - Direct instantiation of classes within client code, which tightly couples code to specific implementations and makes it hard to extend or modify.
* __BEST PRACTICES__:
    - Defining clear interfaces for both products (like Task) and factories (TaskFactory).
    - Ensuring that factories create products that follow the same variant or family, maintaining consistency.
    - Keeping the client code independent of the concrete classes, using interfaces or abstract classes to interact with objects.