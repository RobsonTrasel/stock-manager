import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

interface MySQLConnectionOptions {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
}

class MySQLConnection {
  private _pool: mysql.Pool

  constructor(private readonly options: MySQLConnectionOptions) {
    this._pool = mysql.createPool({
      host: options.host || process.env.HOST,
      port: options.port || 3306,
      user: options.user || process.env.USER,
      password: options.password  || process.env.PASSWORD,
      database: options.database || process.env.DATABASE,
      connectionLimit: 10
    });
  }

  async execute(query: string, values?: any[]): Promise<any> {
    const [rows] = await this._pool.query(query, values);
    return rows;
  }
}

const connectionOptions = {
  host: process.env.HOST,
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = new MySQLConnection(connectionOptions)

export { connection, MySQLConnection };