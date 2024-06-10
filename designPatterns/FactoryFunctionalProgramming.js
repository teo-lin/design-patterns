// FACTORY PATTERN STARTING FROM AN INTERFACE
// Useful when there is *NO* common behavior between products
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
const Task = {
    status: 'none',
    do() {},
    delete() { this.status = 'deleted' },
	archive() { this.status = 'archived' }
}


// Concrete Products
function newHomeTask() {
    const task = Object.create(Task)
    task.status = 'planned'
    task.do = function () { this.status = 'completed' }
    return task
}
function newShopTask() {
    const task = Object.create(Task)
    task.status = 'wishlisted'
    task.do = function () { this.status = 'purchased' }
    return task
}
function newWorkTask() {
    const task = Object.create(Task)
    task.status = 'planned'
    task.do = function () { this.status = 'drafted' }
    return task
} // ... etc


// Factory: use a map / switch / ifs to create concrete products
function taskFactory(category) {
    if (category === 'Home') return newHomeTask()
    if (category === 'Shop') return newShopTask()
    if (category === 'Work') return newWorkTask() // ... etc
    else throw new Error('Category not supported')
}


// Client: has access only to the TaskFactory, not the numerous Task category classes
console.log(CATEGORY.Work, STATUS.COMMON.none)
const homeTask = taskFactory(CATEGORY.Home)
const shopTask = taskFactory(CATEGORY.Shop)
const workTask = taskFactory(CATEGORY.Work)
console.log(homeTask.status, shopTask.status, workTask.status) // planned wishlisted planned
homeTask.do()
shopTask.do()
workTask.do()
console.log(homeTask.status, shopTask.status, workTask.status) // completed purchased drafted
homeTask.archive()
shopTask.delete()
console.log(homeTask.status, shopTask.status, workTask.status) // archived deleted completed