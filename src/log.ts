import winston from 'winston';
import config from './config';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
            level: config.get('LOG_LEVEL'),
        }),
        /*
        new winston.transports.File({
            filename: config.get('LOG_FILENAME'),
            format: log.format.json(),
            level: config.get('LOG_LEVEL'),
        }),
         */
    ],
})

export default logger;
