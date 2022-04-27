import winston, { format } from 'winston';

const { combine, timestamp, label, prettyPrint, printf } = format;

const customFormat = printf((info: any) => {
    return ` [${info.timestamp}] [${info.label}] [${String(info.level).toUpperCase()}]: ${info.message}`;
});

/**
 * The logger itself.
 */
const alignColorsAndTime = format.combine(
    format.colorize({
        all: true,
    }),
    format.label({ label: (process.env.SERVICE_NAME || 'service-anon').toUpperCase() }),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] [${info.label}] [${info.level}]: ${info.message}`),
);

export const Logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    handleExceptions: true,
    format: format.combine(format.colorize(), alignColorsAndTime),
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