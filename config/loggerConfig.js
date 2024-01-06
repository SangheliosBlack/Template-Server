require('dotenv').config();

module.exports = {
  fileLogger: process.env.FILE_LOGGER || 'logs/server.log',
  loggerFormat: process.env.LOGGER_FORMAT || 'YYYY-DD-MM HH:mm:ss',
  rotateFileLogger:
    process.env.ROTATE_FILE_LOGGER || 'logs/application-%DATE%.log',
  rotateMaxSize: process.env.ROTATE_MAX_SIZE || '20m',
  rotateMaxDays: process.env.ROTATE_MAX_FILES || '30d',
  rotateDatePattern: process.env.ROTATE_DATE_PATTERN || 'YYYY-MM-DD',
};
