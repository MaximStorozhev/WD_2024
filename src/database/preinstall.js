import mysql from 'mysql2/promise';
import { Logger } from '../logger/index.js';

const migrationTableName = 'migrations'

const migrations = {
    'create_users_table': `CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, type ENUM('tutor', 'student') NOT NULL, UNIQUE (email));`
}




export class Preinstall {
    static connection;
    static logger = new Logger(Preinstall.name)

    static get options() {
        return {
            connectionLimit: 10,
            insecureAuth: true,
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        }
    }

    static get database() {
        return process.env.DATABASE_NAME
    }


    static async run() {
        this.logger.debug('Preinstall....')

        this.connection = await mysql.createConnection(this.options)

        this.logger.debug('Preinstall : Init database...')
        await this.connection.query(`CREATE DATABASE IF NOT EXISTS ${this.database}`)
        await this.connection.query(`USE ${this.database}`)

        this.logger.debug('Preinstall : Init migrations table...')
        await this.connection.query(`CREATE TABLE IF NOT EXISTS ${migrationTableName} (name varchar(100) NOT NULL)`)

        const [executedMigrations] = await this.connection.query(`SELECT name from ${migrationTableName}`)

        const executedMigrationsSet = new Set(executedMigrations.map(({ name }) => name))

        for (const name of Object.keys(migrations)) {
            if (executedMigrationsSet.has(name)) {
                this.logger.debug(`Preinstall : Skip migration "${name}"...`)
                continue
            }

            this.logger.debug(`Preinstall : Run migration "${name}"...`)

            await this.connection.query(migrations[name])
            await this.connection.query(`INSERT INTO ${migrationTableName} (name) VALUES (?)`, [name])
        }

        this.logger.debug('Preinstall completed.')

    }
}