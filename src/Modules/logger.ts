import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;

export class Log {

  private static Format = printf(info => {
    return `[${info.timestamp}][${info.label}][${info.level}]: ${info.message}`;
  });

  public static main = createLogger({
    transports: [
      new transports.File({
        level: 'verbose',
        filename: './dist/Logs/main.log',
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

  public static request = createLogger({
    transports: [
      new transports.File({
        level: 'info',
        filename: './dist/Logs/request.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    ],
    exitOnError: false
  });

}
