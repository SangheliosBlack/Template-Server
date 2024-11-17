class AppError extends Error {

  /**
   *
   * @param {int} statusCode
   * @param {String} message
   * @param {String} usrCode
   * @param {String} field
   * @param {Array} details
   */

  constructor(statusCode, message, usrCode, field, details) {

    super(message);

    if (typeof statusCode !== 'number' || !Number.isInteger(statusCode)) {
      throw new Error('Status code must be an integer');
    }

    this.statusCode = statusCode;
    this.usrCode = usrCode;
    this.details = details || [];
    this.field = field;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

  }
  
}

export default AppError;
