const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const AppError = require('../utils/appError');

const dbConnection = async()=>{
    
    try{
        mongoose.connect(process.env.DB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        logger.info('Connected database');

    }catch(error){
        
        new AppError('Database Error - Talk to Admin', 404);

    }
}

module.exports={

    dbConnection
    
}