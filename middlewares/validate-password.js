const messageErrors = require('../utils/messages_errors');
const AppError = require('../utils/appError')

const validatePassword = async (password, { req }) => {
    const confirm_password = req.body.confirm_password;

    if (password !== confirm_password) {
        new AppError(messageErrors.CONTRASENA_NO_COINCIDE,404)
    }
    return true;
};

module.exports = validatePassword;

