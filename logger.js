const log4js = require('log4js');

log4js.configure({
    appenders: {
        consola: { type: 'console' },
        archivoWarnings: { type: 'file', filename: 'warn.log' },
        archivoErrores: { type: 'file', filename: 'error.log' },

    },
    categories: {
        default: { appenders: ['consola'], level: 'all' },
        archivowarn: { appenders: ['archivoWarnings'], level: 'warn' },
        archivoerror: { appenders: ['archivoErrores'], level: 'error' }
    }
}
)

module.exports = log4js

