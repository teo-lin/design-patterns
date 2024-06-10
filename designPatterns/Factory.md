# Factory
* __USE FOR__: Creating objects without exposing the instantiation logic to the client while providing a way to refer to newly created objects through a common interface. 
* __USE CASES__: Widely used for limited sets (3-7) of Concrete product classes 
* __EXAMPLE__: Best fit for situations where you have a set of classes of the same type, for example different communication channels for alerts (email, sms, slack, whatsapp...). The client will get access to an AlertFactory and can call the EmailAlert via AlertFactory.newAlert('email'), but cannot instantiate a new EmailAlert, as it doesn't need to know how it's implemented.
    If there is no common behavior between the different types of alerts (i.e. Concrete Products), start from an Alert interface, otherwise start from an abstract Alert class.
* __SUBOPTIMAL SOLUTIONS__:
    - Direct instantiation of classes throughout the application, leading to tight coupling and difficulties in managing changes in instantiation logic.
    - Overuse of inheritance to create variations of an object, making the system rigid and less adaptable to changes.
* __BEST PRACTICES__:
    - common interface / abstract class for products
    - encapsulation of creation logic within the Factory
    - parametrize the factory method