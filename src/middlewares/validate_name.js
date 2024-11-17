import messageErrors from '../utils/messages_errors.js';
import AppError from '../utils/appError.js';

const validateName = (nombre, { req }) => {
    
    const myArray = nombre.split(' ');

    if (myArray.length <= 2) {
        new AppError(messageErrors.FORMATO_NOMBRE_INCORRECTO,404)
    }

    return true;
};

export default validateName;