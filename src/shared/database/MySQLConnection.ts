import mysql from 'mysql2/promise'

interface MySQLConnectionOptions {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
}

class MySQLConnection {
  private _pool: mysql.Pool

  constructor(private readonly options: MySQLConnectionOptions) {
    this._pool = mysql.createPool({
      host: options.host,
      port: options.port || 3306,
      user: options.user,
      password: options.password,
      database: options.database,
      connectionLimit: 10
    });
  }

  async execute(query: string, values?: any[]): Promise<any> {
    const [rows] = await this._pool.query(query, values);
    return rows;
  }
}

export { MySQLConnection };