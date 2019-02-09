"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = __importStar(require("moment-timezone"));
const winston_1 = require("winston");
const { combine, timestamp, label, printf, colorize } = winston_1.format;
/**
 * @export
 * @class Log
 */
class Log {
    /**
     * Main logger getter
     *
     * @readonly
     * @static
     * @type {Logger}
     * @memberof Log
     */
    static get main() {
        return this.mainLog;
    }
    /**
     * Request logger getter
     *
     * @readonly
     * @static
     * @type {Logger}
     * @memberof Log
     */
    static get request() {
        return this.requestLog;
    }
    /**
     * Creates the loggers
     *
     * @static
     * @memberof Log
     */
    static initialize() {
        this.mainLog = winston_1.createLogger({
            transports: [
                new winston_1.transports.File({
                    level: 'verbose',
                    filename: `${__dirname}/../Logs/main.log`,
                    handleExceptions: true,
                    maxsize: 5242880,
                    maxFiles: 5,
                    format: combine(label({ label: 'MAIN' }), timestamp(), Log.Format)
                }),
                new winston_1.transports.Console({
                    level: 'info',
                    handleExceptions: true,
                    format: combine(colorize(), label({ label: 'MAIN' }), timestamp(), Log.Format)
                })
            ],
            exitOnError: false
        });
        this.requestLog = winston_1.createLogger({
            transports: [
                new winston_1.transports.File({
                    level: 'info',
                    filename: '${__dirname}/../Logs/morgan.log',
                    handleExceptions: true,
                    maxsize: 5242880,
                    maxFiles: 5,
                })
            ],
            exitOnError: false
        });
        if (process.env.NODE_ENV === 'test' && process.env.DEBUG !== 'true') {
            this.mainLog.silent = true;
            this.requestLog.silent = true;
        }
    }
}
/**
 * Logger format
 *
 * @private
 * @static
 * @memberof Log
 */
Log.Format = printf(info => {
    info.timestamp = moment.tz('Asia/Kolkata').format('YYYY-MM-DD|HH:mm:ss');
    return `[${info.timestamp}] [${info.label}] [${info.level}]: ${info.message}`;
});
exports.Log = Log;
//# sourceMappingURL=logger.js.map