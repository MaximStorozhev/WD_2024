import express from 'express'
import session from 'express-session'
import { join } from 'path'
import { Logger } from './logger/index.js'
import { SessionStore } from './database/session-store.js'
import { authRouter } from './auth/auth.router.js'

export class Server {
    static app = undefined
    static logger = new Logger(Server.name);

    static get staticDir() {
        return join(process.cwd(), 'public');
    }

    static get options() {
        return {
            port: process.env.PORT || 3030
        }
    }

    static get router() {
        return express.Router().use('/auth', authRouter)
    }

    static init() {
        this.app = express()

        this.app.use(express.static(this.staticDir));

        this.app.use(session({
            key: 'sid',
            secret: process.env.SESSION_SECRET,
            store: SessionStore.store,
            resave: false,
            saveUninitialized: false
        }))

        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            this.logger.log(`[${req.method}] ${req.path}`)
            next()
        })

        this.app.use('/api', this.router)
    }

    static listen() {
        this.app.listen(this.options.port, () => {
            this.logger.info(`Server started on port ${this.options.port}`)
        })
    }
}