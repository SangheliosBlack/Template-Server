class AppError extends Error {
    /**
     *
     * @param {int} HTTPStatusCode
     * @param {String} message
     * @param {String} usrCode
     * @param {String} field
     * @param {Array} details
     */
    constructor(statusCode, message, usrCode, field, details) {
      super(message);
      this.statusCode = statusCode;
      this.usrCode = usrCode;
      this.details = details ? details : [];
      this.field = field;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  