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

// BEST PRACTICE
export class ConnectionPool {
    private pool: DatabaseConnection[] = [];
    private maxConnections: number;

    constructor(maxConnections: number = 10) {
        this.maxConnections = maxConnections;
    }

    getConnection(): DatabaseConnection {
        if (this.pool.length > 0) {
            return this.pool.pop()!;
        } else if (this.maxConnections > 0) {
            this.maxConnections--;
            return new DatabaseConnection();
        } else {
            throw new Error('No available connections');
        }
    }

    releaseConnection(connection: DatabaseConnection): void {
        this.pool.push(connection);
    }
}

// USAGE
const pool = new ConnectionPool(5);

const connection1 = pool.getConnection();
connection1.query("SELECT * FROM users");

const connection2 = pool.getConnection();
connection2.query("SELECT * FROM tasks");

// Return connections to the pool
pool.releaseConnection(connection1);
pool.releaseConnection(connection2);
