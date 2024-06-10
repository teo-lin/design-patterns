// FACTORY PATTERN STARTING FROM AN ABSTRACT CLASS
// Useful when there *IS* common behavior between products
const toEnum = o => Object.fromEntries(Object.entries(o).map(([k,v]) => [k, Object.fromEntries(v.map(e => [e,e]))]))
const STATUS = toEnum({
    COMMON: ['none', 'deleted', 'archived'],
    HOME: ['planned', 'started', 'completed'],
    SHOP: ['wishlisted', 'purchased', 'rejected', 'postponed', 'ordered'],
    WORK: ['planned', 'assigned', 'started', 'drafted', 'reviewed', 'completed'],
})
const {CATEGORY} = toEnum({CATEGORY:['Work', 'Home', 'Play', 'Shop', 'Body', 'Mind', 'Trip', 'Life']})
// NOTE: we should use STATUS and CATEGORY everywhere to ensure type safety; we'll use strings for readability


// Generic Task base class
class Task {
    status = 'none'
    do() {}
	delete() { this.status = 'deleted' }
	archive() { this.status = 'archived' }
}
  
  
// Concrete Products
class HomeTask extends Task {
	status = 'planned'
	do() {this.status = 'completed'}
}
class ShopTask extends Task {
	status = 'wishlisted'
	do() {this.status = 'purchased'}
}
class WorkTask extends Task {
	status = 'planned'
	do() {this.status = 'drafted'}
} // ...etc


// Factory: use a map / switch / ifs to create concrete products
class TaskFactory {
	static newTask(category) {
		if (category === 'Home') return new HomeTask()
		if (category === 'Shop') return new ShopTask() 
        if (category === 'Work') return new WorkTask() // ... etc
		else throw new Error('Category not supported') // can use a switch statement as well
	}
}


// Client: has access only to the TaskFactory, not the numerous Task category classes
const homeTask = TaskFactory.newTask(CATEGORY.Home)
const shopTask = TaskFactory.newTask(CATEGORY.Shop)
const workTask = TaskFactory.newTask(CATEGORY.Work)
console.log(homeTask.status, shopTask.status, workTask.status) // planned wishlisted planned
workTask.do()
homeTask.do()
shopTask.do()
console.log(homeTask.status, shopTask.status, workTask.status) // completed purchased drafted
homeTask.archive()
shopTask.delete()
console.log(homeTask.status, shopTask.status, workTask.status) // archived deleted completed