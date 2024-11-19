import debug from 'debug';

const LEVEL_PREFIX = 'api'

export class Logger {
    level;

    log;

    error;

    info;

    debug;

    warn;

    constructor(level, baseLogger = null) {
        this.level = baseLogger ? `${baseLogger.level}:${level}` : level;
        this.error = debug.debug(`${LEVEL_PREFIX}:${this.level} ERROR`);

        this.log = debug.debug(`${LEVEL_PREFIX}:${this.level} LOG`);
        this.log.log = console.log.bind(console);

        this.info = debug.debug(`${LEVEL_PREFIX}:${this.level} INFO`);
        this.info.log = console.info.bind(console);

        this.debug = debug.debug(`${LEVEL_PREFIX}:${this.level} DEBUG`);
        this.debug.log = console.debug.bind(console);

        this.warn = debug.debug(`${LEVEL_PREFIX}:${this.level} WARN`);
        this.warn.log = console.warn.bind(console);
    }
}
