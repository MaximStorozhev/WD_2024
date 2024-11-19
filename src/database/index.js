import mysql from 'mysql2/promise';
import { Logger } from '../logger/index.js';

export async function init() {
    connection = createPool(options);
}

export class Database {
    static connection;
    static logger = new Logger(Database.name)

    static get options() {
        return {
            connectionLimit: 10,
            insecureAuth: true,
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        }
    }

    static async init() {
        this.logger.debug('Database init...');

        this.connection = mysql.createPool(this.options)

        await this.connection.query('SELECT 1+1 as test')

        this.logger.debug('Database inited.');
    }
}