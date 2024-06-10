class Singleton {
	private static instance: Singleton
  
	private constructor() {} // this prevents direct instantiation

	public static getInstance(): Singleton {
		if (!Singleton.instance) Singleton.instance = new Singleton()
		return Singleton.instance
	}

	public query(sql: string): void {
		console.log('executed query: ' + sql)
	}
}

// --------------- USAGE / CLIENT CODE FILE:
const dbConnection1 = Singleton.getInstance()
dbConnection1.query('SELECT * FROM employees')

const dbConnection2 = Singleton.getInstance()
dbConnection2.query('UPDATE employees SET age=25')

console.log(dbConnection1 === dbConnection2) // true

// if you would make the constructor public and instantiate normally, it wouldn't be a singleton:
// const dbConnection3 = new DatabaseConnection()
// const dbConnection4 = new DatabaseConnection()
// console.log(dbConnection3 === dbConnection4) // false ! 