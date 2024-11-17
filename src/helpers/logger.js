import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import loggerConfig from '../config/loggerConfig.js';
import environmentConfig from '../config/environmentConfig.js';

const fileTransport = new transports.File({
  filename: loggerConfig.fileLogger,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: loggerConfig.loggerFormat }),
    format.align(),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
});

const rotateFile = new DailyRotateFile({
  filename: loggerConfig.rotateFileLogger,
  datePattern: loggerConfig.rotateDatePattern,
  zippedArchive: true,
  maxSize: loggerConfig.rotateMaxSize,
  maxFiles: loggerConfig.rotateMaxDays,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: loggerConfig.loggerFormat }),
    format.align(),
    format.printf(
      (info) =>
        `[${info.timestamp}] ${info.level}: ${info.message} ${
          info.stack ? '\n ' + info.stack : ''
        }`
    )
  ),
});

const consoleTransport = new transports.Console({
  format: format.combine(
    format.errors({ stack: true }),
    format.colorize(),
    format.timestamp({ format: loggerConfig.loggerFormat }),
    format.align(),
    format.printf(
      (info) =>
        `[${info.timestamp}] ${info.level}: ${info.message} ${
          info.stack ? '\n ' + info.stack : ''
        }`
    )
  ),
});

const logger = createLogger({
  transports: environmentConfig.environment === 'production'
    ? [consoleTransport, rotateFile]
    : [consoleTransport],
  exitOnError: false,
});

export default logger;
