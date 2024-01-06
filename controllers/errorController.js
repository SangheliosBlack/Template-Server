const AppError = require('../utils/appError');
const logger = require('../helpers/logger');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(400, message);
};

const sendErrorDev = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      //error: err,
      code: err.usrCode,
      message: err.message,
      field: err.field,
      details: err.details,
      stack: err.stack,
    });
  }
  //RENDER
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        code: err.usrCode,
        message: err.message,
        field: err.field,
        details: err.details,
      });
    }
    //log
    return logger.error('Error!! ', err);
    //no details to client
  }

  //RENDER
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  //log
  logger.error('Error!! ', err);
  //no details to client
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Try again later',
  });
};

const handleJWTError = () =>
  new AppError(401, 'Invalid token. Please log in again!');

const handleJWTExpiresError = () =>
  new AppError(401, 'Token expired. Please log in again!');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  logger.error('Error:', err);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiresError();

    sendErrorProd(error, req, res);
  }
};
