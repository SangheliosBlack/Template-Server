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
    
        logger.info('Base de datos conectada');

    }catch(error){
        
        new AppError('Error en la base de datos - Hable con el Admin', 404);

    }
}

module.exports={

    dbConnection
    
}