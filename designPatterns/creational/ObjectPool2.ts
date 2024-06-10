class DatabaseConnection {
    private static counter = 0;
    id: number;

    constructor() {
        DatabaseConnection.counter += 1;
        this.id = DatabaseConnection.counter;
        console.log(`Creating new database connection: ${this.id}`);
    }

    query(sql: string): void {
        console.log(`Executing query on connection ${this.id}: ${sql}`);
    }
}


export class ConnectionPool {
    private pool: DatabaseConnection[] = [];
    private maxConnections: number;
    private createdConnections: number = 0;

    constructor(maxConnections: number = 10) {
        this.maxConnections = maxConnections;
    }

    private createNewConnection(): DatabaseConnection {
        if (this.createdConnections >= this.maxConnections) {
            throw new Error('Maximum connections reached');
        }
        const connection = new DatabaseConnection();
        this.createdConnections++;
        return connection;
    }

    getConnection(): DatabaseConnection {
        if (this.pool.length > 0) {
            const connection =  this.pool.pop();
            if (connection instanceof DatabaseConnection) {
                return connection; 
            } 
            throw new Error('No available connections');
        }
        return this.createNewConnection();
    }

    releaseConnection(connection: DatabaseConnection): void {
        this.pool.push(connection);
        this.createdConnections--;
    }
}

// USAGE
const pool = new ConnectionPool(5);

const connection1 = pool.getConnection();
connection1.query("SELECT * FROM users");

const connection2 = pool.getConnection();
connection2.query("SELECT * FROM orders");

// Return connections to the pool
pool.releaseConnection(connection1);
pool.releaseConnection(connection2);
