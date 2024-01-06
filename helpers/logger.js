const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const loggerConfig = require('../config/loggerConfig');
const environmentConfig = require('../config/environmentConfig');

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

const rotateFile = new transports.DailyRotateFile({
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

module.exports =
  environmentConfig.environment === 'production'
    ? createLogger({
        transports: [consoleTransport, rotateFile],
        exitOnError: false,
      })
    : createLogger({
        transports: [consoleTransport],
        exitOnError: false,
      });
