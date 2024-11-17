import messageErrors from '../utils/messages_errors.js';
import AppError from '../utils/appError.js';

const validatePassword = async (password, { req }) => {
    
    const confirm_password = req.body.confirm_password;

    if (password !== confirm_password) {
        new AppError(messageErrors.CONTRASENA_NO_COINCIDE,404)
    }
    return true;
};

export default validatePassword;

