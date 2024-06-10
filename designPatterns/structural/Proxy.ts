// The actual service we will create a Proxy for:
interface SomeServiceInterface {
    doStuff(userId: number): string;
}
class SomeService implements SomeServiceInterface {
    doStuff(userId: number): string {
        return `Some stuff`;
    }
}

// Some functionality like logging, validation, authorisation etc that we want to add to our actual service
class LoggerService {
    info(id: number): void {
        console.log(`User #${id} accessed SomeService.doStuff()`);
    }
}
class GuardService {
    checkPermissionFor(userId: number): boolean {
        return true;
    }
}

// The Proxy service must implement the same interface as the actual service
class ProxyOfSomeService implements SomeServiceInterface {
    private someService = new SomeService();
    private guard = new GuardService();
    private logger = new LoggerService();

    doStuff(userId: number): string {
        if (this.guard.checkPermissionFor(userId)) {
            const stuff = this.someService.doStuff(userId);
            this.logger.info(userId);
            return stuff;
        } else {
            return 'Access denied';
        }
    }
}

// The Client will call the ProxyOfSomeService just like it woud call the actual SomeService
const someService = new ProxyOfSomeService();
const stuff = someService.doStuff(123);
console.log(`Result: ${stuff}`);