import winston from 'winston';
/**
 * The logger itself.
 */
export declare const logger: winston.Logger;
/**
 * Publish a info. Logger message.
 * @param message The Message
 * @param label The label
 */
export declare function infoLog(message: string, label?: string): void;
