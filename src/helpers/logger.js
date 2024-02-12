const chalk = require('chalk');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const loggerConfig = require('../config/loggerConfig');
const environmentConfig = require('../config/environmentConfig');

const coloredFormat = format.printf(
  (info) =>
    `[${info.timestamp}] ${info.level}: ${
      info.message && info.level !== 'error' ? chalk.white.bgBlue.bold(info.message) : info.message
    } ${
      info.stack
        ? '\n ' +
          (info.level === 'error' ? chalk.red(info.stack) : chalk.gray(info.stack))
        : ''
    }`
);

const fileTransport = new transports.File({
  filename: loggerConfig.fileLogger,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: loggerConfig.loggerFormat }),
    format.align(),
    coloredFormat
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
    coloredFormat
  ),
});

const consoleTransport = new transports.Console({
  format: format.combine(
    format.errors({ stack: true }),
    format.colorize(),
    format.timestamp({ format: loggerConfig.loggerFormat }),
    format.align(),
    coloredFormat
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
