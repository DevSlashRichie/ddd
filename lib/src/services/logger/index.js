"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLog = exports.logger = void 0;
const winston_1 = __importStar(require("winston"));
const { combine, timestamp, label, prettyPrint, printf } = winston_1.format;
const customFormat = printf((info) => {
    return `[${info.timestamp} ${String(info.level).toLowerCase()}] [${info.label}]: ${info.message}`;
});
/**
 * The logger itself.
 */
exports.logger = winston_1.default.createLogger({
    format: combine(label({ label: process.env.SERVICE_NAME || "no-name" }), timestamp(), prettyPrint({
        colorize: true
    }), customFormat),
    handleExceptions: true,
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: 'simple.log',
            dirname: 'logs'
        }),
        new winston_1.default.transports.File({
            filename: "json.log",
            dirname: "logs",
            format: winston_1.format.json({ space: 0 })
        }),
    ]
});
/**
 * Publish a info. Logger message.
 * @param message The Message
 * @param label The label
 */
function infoLog(message, label) {
    exports.logger.log("info", `${label ? `[${label}] ` : ""}${message}`);
}
exports.infoLog = infoLog;
//# sourceMappingURL=index.js.map