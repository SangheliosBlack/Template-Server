import mongoose from 'mongoose';
import AppError from '../utils/appError.js';

const validateMongoId = (req, res, next) => {

  const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError(500, 'ID inválido', 'VALIDATION_01'));
    }

  next();

};

export default validateMongoId;
