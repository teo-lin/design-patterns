import { Injectable } from "@nestjs/common";
import { createConnection, Connection } from "typeorm";

@Injectable()
export class DatabaseSingleton {
  private static connection: Connection;

  private constructor() {}

  public static async getInstance(): Promise<Connection> {
    if (!DatabaseSingleton.connection) {
      DatabaseSingleton.connection = await createConnection({ /*database connection configuration*/ });
      return DatabaseSingleton.connection;
    }
  }
}

// USAGE: some.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseSingleton } from './database.singleton';

@Injectable()
export class SomeService {
  constructor(private readonly databaseSingleton: DatabaseSingleton) {}

  async someMethod(): Promise<void> {
    const connection = await this.databaseSingleton.getInstance();
    // database-related logic using the 'connection' object
  }
}

