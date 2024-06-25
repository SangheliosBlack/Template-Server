const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const AppError = require('../utils/appError');

const uri = process.env.DB_ATLAS;

async function connectToDatabase() {
    try {
        mongoose.connect(uri);
        logger.info('Connected database');
    } catch (error) {
        new AppError('Database Error - Talk to Admin', 404);
    } finally {
    }
}

module.exports = {
    connectToDatabase
};