require('express-async-errors');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
    handleExceptions: true,
    handleRejections: true
  });

module.exports = logger;
