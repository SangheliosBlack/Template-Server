const messageErrors = require('../utils/messages_errors');
const AppError = require('../utils/appError');

const validateName = (nombre, { req }) => {
    const myArray = nombre.split(' ');

    if (myArray.length <= 2) {
        new AppError(messageErrors.FORMATO_NOMBRE_INCORRECTO,404)
    }

    return true;
};

module.exports = validateName;