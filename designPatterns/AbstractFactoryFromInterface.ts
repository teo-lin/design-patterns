// ABSTRACT FACTORY FROM INTERFACES
// Interfaces
type Status = 'planned' | 'started' | 'drafted' | 'reviewed' | 'completed'
type Priority = 'urgent' | 'normal' | 'none'
interface iTask {
    status: Status;
    priority: Priority;
    do(): void;
}
interface iTaskFactory {
    newUrgentTask(): iTask;
    newNormalTask(): iTask;
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

// Concrete Factories
export class WorkTasksFactory implements iTaskFactory {
	newUrgentTask(): iTask {return new UrgentHomeTask()}
	newNormalTask(): iTask {return new NormalHomeTask()}
}
export class HomeTasksFactory implements iTaskFactory {
	newUrgentTask(): iTask {return new UrgentWorkTask()}
	newNormalTask(): iTask {return new NormalWorkTask()}
}

// Abstract Factory
export class TaskFamilyFactory {
	static newTaskFactory(type: string): iTaskFactory {
		if (type === 'work') return new WorkTasksFactory()
		if (type === 'home') return new HomeTasksFactory()
		else throw new Error('Type not supported')
	}
}

// --------------- USAGE / CLIENT CODE FILE:
const workTaskFactory = TaskFamilyFactory.newTaskFactory('work')
const urgentWorkTask = workTaskFactory.newUrgentTask()
const normalWorkTask = workTaskFactory.newNormalTask()
urgentWorkTask.do()
normalWorkTask.do()
console.log(urgentWorkTask, normalWorkTask)

const homeTaskFactory = TaskFamilyFactory.newTaskFactory('home')
const urgentHomeTask = homeTaskFactory.newUrgentTask()
const normalHomeTask = homeTaskFactory.newNormalTask()
urgentHomeTask.do()
normalHomeTask.do()
console.log(urgentHomeTask, normalHomeTask)