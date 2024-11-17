import mongoose from 'mongoose';

import logger from '../helpers/logger.js';
import AppError from '../utils/appError.js';

const dbConnection = async()=>{
    
    try{

        mongoose.connect(process.env.DB_ATLAS);
    
        logger.info('Database connected');

    }catch(error){
        
      new AppError('Database error - Contact the Admin', 404);

    }
}

export default dbConnection;