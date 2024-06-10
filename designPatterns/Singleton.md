* __USE FOR__: Ensuring a class has only one instance and providing a global point of access to it.
* __USE CASES__: Database connections, Loggers, Config, Cache, Device managers, Thread pools, Application context, State management, Node.js imports, Nest.js injected classes
* __EXAMPLE__: Creating a single database connection shared across an application.
* __SUBOPTIMAL SOLUTIONS__:
  - Creating a new instance whenever a database connection is needed (For example, by adding the db initialisation to the constructor) => excessive resource usage. 
  - Storing the database connection in a global variable, which may lead to less controlled access and testing difficulties.
* __BEST PRACTICES__: Private constructor, Static instance variable, Lazy initialization, Static getInstance()