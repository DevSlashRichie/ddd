import winston, { format } from 'winston';

const { combine, timestamp, label, prettyPrint, printf } = format;

const customFormat = printf((info: any) => {
    return `[${info.timestamp}] [${String(info.level).toLowerCase()}] [${info.label}]: ${info.message}`;
});

/**
 * The logger itself.
 */
export const Logger = winston.createLogger({
    format: combine(
        label({ label: process.env.SERVICE_NAME || 'service-anon' }),
        timestamp(),
        prettyPrint({
            colorize: true
        }),
        customFormat
    ),
    handleExceptions: true,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'simple.log',
            dirname: 'logs'
        }),
        new winston.transports.File({
            filename: 'json.log',
            dirname: 'logs',
            format: format.json({ space: 0 })
        }),
    ]
});
