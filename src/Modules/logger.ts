import * as moment from 'moment-timezone';
import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;

export class Log {

  private static mainLog: Logger;
  private static requestLog: Logger;

  private static Format = printf(info => {
    info.timestamp = moment.tz('Asia/Kolkata').format('YYYY-MM-DD|HH:mm:ss');
    return `[${info.timestamp}] [${info.label}] [${info.level}]: ${info.message}`;
  });

  public static get main(): Logger {
    return this.mainLog;
  }
  public static get request(): Logger {
    return this.requestLog;
  }

  public static initialize() {
    if (process.env.NODE_ENV === 'test') {
      this.mainLog = createLogger({
        transports: []
      });

      this.requestLog = createLogger({
        transports: []
      });
    } else {
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
    }
  }

}
