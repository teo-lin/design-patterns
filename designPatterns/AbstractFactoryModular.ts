// ABSTRACT FACTORY FROM AN INTERFACE
// Abstract Product Interface
type Status = 'planned' | 'started' | 'drafted' | 'reviewed' | 'completed'
type Priority = 'urgent' | 'normal' | 'none'
interface iTask {
    status: Status;
    priority: Priority;
    do(): void;
}
// Concrete Products
class UrgentWorkTask implements iTask {
	status: Status = 'planned'
	priority: Priority = 'urgent'
	do(): void {this.status = 'drafted'}
}
class NormalWorkTask implements iTask {
	status: Status = 'planned'
	priority: Priority = 'normal'
	do(): void {this.status = 'drafted'}
}
class UrgentHomeTask implements iTask {
	status: Status = 'planned'
	priority: Priority = 'urgent'
	do(): void {this.status = 'completed'}
}
class NormalHomeTask implements iTask {
	status: Status = 'planned'
	priority: Priority = 'normal'
	do(): void {this.status = 'completed'}
}

// Abstract Factory Interface
interface TaskFactory {
    newUrgentTask(): iTask;
    newNormalTask(): iTask;
}
// Concrete Factories
export class WorkTasksFactory implements TaskFactory {
	newUrgentTask(): iTask {return new UrgentHomeTask()}
	newNormalTask(): iTask {return new NormalHomeTask()}
}
export class HomeTasksFactory implements TaskFactory {
	newUrgentTask(): iTask {return new UrgentWorkTask()}
	newNormalTask(): iTask {return new NormalWorkTask()}
}

// --------------- USAGE / CLIENT CODE FILE:
const workTaskFactory = new WorkTasksFactory()
const urgentWorkTask = workTaskFactory.newUrgentTask()
const normalWorkTask = workTaskFactory.newNormalTask()
urgentWorkTask.do()
normalWorkTask.do()
console.log(urgentWorkTask, normalWorkTask)

const homeTaskFactory = new HomeTasksFactory()
const urgentHomeTask = homeTaskFactory.newUrgentTask()
const normalHomeTask = homeTaskFactory.newNormalTask()
urgentHomeTask.do()
normalHomeTask.do()
console.log(urgentHomeTask, normalHomeTask)