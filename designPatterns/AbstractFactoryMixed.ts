// ABSTRACT FACTORY FROM A MIXIN
// Abstract Product Class
type Status = 'planned' | 'started' | 'drafted' | 'reviewed' | 'completed'
type Priority = 'urgent' | 'normal' | 'none'
abstract class Task {
	status: Status = 'planned'
	priority: Priority = 'none'
	start(): void {this.status = 'started'}
    abstract do(): void;
}
abstract class UrgentTask extends Task {
	priority: Priority = 'urgent'
}
abstract class NormalTask extends Task {
	priority: Priority = 'normal'
}
abstract class WorkTask extends Task {
	do(): void {this.status = 'drafted'}
}
abstract class HomeTask extends Task {
	do(): void {this.status = 'completed'}
}

// Concrete Products
class UrgentWorkTask extends WorkTask implements UrgentTask {}
class UrgentHomeTask extends HomeTask implements UrgentTask {}
class NormalWorkTask extends WorkTask implements NormalTask {}
class NormalHomeTask extends HomeTask implements NormalTask {}

// Abstract Factory Interface and Concrete Factories
interface TaskFactory {
    newUrgentTask(): Task;
    newNormalTask(): Task;
}
export class WorkTasksFactory implements TaskFactory {
	newUrgentTask(): Task {return new UrgentWorkTask()}
	newNormalTask(): Task {return new NormalWorkTask()}
}
export class HomeTasksFactory implements TaskFactory {
	newUrgentTask(): Task {return new UrgentHomeTask()}
	newNormalTask(): Task {return new NormalHomeTask()}
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