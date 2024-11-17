import AppError from '../utils/appError.js';
import logger from '../helpers/logger.js';

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new AppError(400, message);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(400, message);
};

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            code: err.usrCode,
            message: err.message,
            field: err.field,
            details: err.details,
            stack: err.stack,
        });
    }
    return res.status(err.statusCode).render('404', {
        title: 'Something went wrong',
        msg: err.message,
    });
};

const sendErrorProd = (err, req, res) => {
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
        logger.error('Error!! ', err);
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }

    if (err.isOperational) {
        return res.status(err.statusCode).render('error', { // Asegúrate de que 'error' es el nombre correcto de la vista
            title: 'Something went wrong',
            msg: err.message,
        });
    }
    
    logger.error('Error!! ', err);
    return res.status(500).render('error', { // Asegúrate de que 'error' es el nombre correcto de la vista
        title: 'Something went wrong',
        msg: 'Try again later',
    });
};

const handleJWTError = () => new AppError(401, 'Invalid token. Please log in again!');

const handleJWTExpiresError = () => new AppError(401, 'Token expired. Please log in again!');

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    logger.error('Error:', err);
    
    if (process.env.NODE_ENV === 'np') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign(err);

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiresError();

        sendErrorProd(error, req, res);
    }
};
