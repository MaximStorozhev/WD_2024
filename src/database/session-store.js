import MySQLStore from 'express-mysql-session'
import session from 'express-session';
import { Database } from './index.js';

export class SessionStore {
    static get store() {
        return new (MySQLStore(session))({}, Database.connection);
    }

}