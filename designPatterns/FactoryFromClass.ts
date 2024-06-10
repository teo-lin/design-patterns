// FACTORY PATTERN STARTING FROM AN ABSTRACT CLASS
// Useful when there *IS* common behavior between products
type CommonStatus = 'none' | 'deleted' | 'archived'
type HomeStatus = CommonStatus | 'planned' | 'started' | 'completed'
type ShopStatus = CommonStatus | 'wishlisted' | 'purchased' | 'rejected' | 'postponed' | 'ordered'
type WorkStatus = CommonStatus | 'planned' | 'assigned' | 'started' | 'drafted' | 'reviewed' | 'completed'
type TaskStatus = WorkStatus | HomeStatus | ShopStatus
enum CATEGORY { Work='Work', Home='Home', Play='Play', Shop='Shop', Body='Body', Mind='Mind', Trip='Trip', Life='Life' }


// Abstract Class (holds common properties/behaviors)
abstract class Task { 
	status: TaskStatus = 'none'
	do(): void {}
	delete(): void { this.status = 'deleted' }
	archive(): void { this.status = 'archived' }
}


// Concrete Products
class HomeTask extends Task {
	status: HomeStatus = 'planned'
	do() {this.status = 'completed'}
}
class ShopTask extends Task {
	status: ShopStatus = 'wishlisted'
	do() {this.status = 'purchased'}
}
class WorkTask extends Task {
	status: WorkStatus = 'planned'
	do() {this.status = 'drafted'}
} // ...etc


// Factory: use a map / switch / ifs to create concrete products
export class TaskFactory {
	static newTask(category: string): Task {
		if (category === 'Work') return new WorkTask()
		if (category === 'Home') return new HomeTask()
		if (category === 'Shop') return new ShopTask() // ... etc
		else throw new Error('Category not supported')
	}
}


// Client: has access only to the TaskFactory, not the numerous Task category classes
const homeTask: Task = TaskFactory.newTask(CATEGORY.Home)
const shopTask: Task = TaskFactory.newTask(CATEGORY.Shop)
const workTask: Task = TaskFactory.newTask(CATEGORY.Work)
console.log(homeTask.status, shopTask.status, workTask.status) // planned wishlisted planned
homeTask.do()
shopTask.do()
workTask.do()
console.log(homeTask.status, shopTask.status, workTask.status) // completed purchased drafted
homeTask.archive()
shopTask.delete()
console.log(homeTask.status, shopTask.status, workTask.status) // archived deleted completed