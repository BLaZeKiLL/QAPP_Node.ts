import * as moment from 'moment-timezone';
import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;

/**
 * @export
 * @class Log
 */
export class Log {

  /**
   * Main logger
   *
   * @private
   * @static
   * @type {Logger}
   * @memberof Log
   */
  private static mainLog: Logger;

  /**
   * Request logger
   *
   * @private
   * @static
   * @type {Logger}
   * @memberof Log
   */
  private static requestLog: Logger;

  /**
   * Logger format
   *
   * @private
   * @static
   * @memberof Log
   */
  private static Format = printf(info => {
    info.timestamp = moment.tz('Asia/Kolkata').format('YYYY-MM-DD|HH:mm:ss');
    return `[${info.timestamp}] [${info.label}] [${info.level}]: ${info.message}`;
  });

  /**
   * Main logger getter
   *
   * @readonly
   * @static
   * @type {Logger}
   * @memberof Log
   */
  public static get main(): Logger {
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
  public static get request(): Logger {
    return this.requestLog;
  }

  /**
   * Creates the loggers
   *
   * @static
   * @memberof Log
   */
  public static initialize() {
    this.mainLog = createLogger({
      transports: [
        new transports.File({
          level: 'verbose',
          filename: `${__dirname}/../Logs/main.log`,
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          format: combine(label({ label: 'MAIN' }), timestamp(), Log.Format)
        }),
        new transports.Console({
          level: 'info',
          handleExceptions: true,
          format: combine(colorize(), label({ label: 'MAIN' }), timestamp(), Log.Format)
        })
      ],
      exitOnError: false
    });

    this.requestLog = createLogger({
      transports: [
        new transports.File({
          level: 'info',
          filename: '${__dirname}/../Logs/morgan.log',
          handleExceptions: true,
          maxsize: 5242880, // 5MB
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
