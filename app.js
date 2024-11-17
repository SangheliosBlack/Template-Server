import expressWinston from 'express-winston';
import swaggerUi from'swagger-ui-express';
import swaggerJsdoc from'swagger-jsdoc';
import compression from  'compression';
import path, { dirname } from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import passport from 'passport';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import globalErrorHandler from'./src/controllers/error.js';
import {initializeSocketServer} from './src/sockets/socket.js';
import trim_json_values from './src/utils/trim_json_values.js';
import swaggerOptions from './src/utils/swagger_config.js';
import corsOptions from './src/utils/cors_config.js';
import dbConnection from './src/database/config.js';
import AppError from './src/utils/appError.js';
import loadRoutes from './src/routeLoader.js';
import logger from './src/helpers/logger.js';
import routes from './src/routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Server {

    constructor(){
        
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 3000;
        this.apiVersion = `/api/${process.env.API_VERSION || 'v1'}/${process.env.NODE_ENV}`;

        this.io = initializeSocketServer(this.server); 

        this.middlewares();
        this.conectarDB();
        this.routes();

    }

    async conectarDB(){

        await dbConnection();

    }

    middlewares(){

      this.setupLogger();
      this.setupSecurity();
      this.setupCors();

      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

      this.app.get('/api-docs.json',(req,res)=>{
        res.setHeader('Content-Type','application/json');
        res.send(swaggerJsdoc(swaggerOptions.options));
      });

      this.app.use(express.static(path.join(__dirname, 'src', 'public')));
      this.app.use(bodyParser.json(),trim_json_values);
      this.app.use(compression());

      if (process.env.NODE_ENV !== 'p') {
        this.app.use(morgan('dev'));
      }

      this.app.use(
        bodyParser.urlencoded({
          limit: '50mb',
          extended: true,
        })
      );

      import('./src/config/authentication.js');
      this.app.use(passport.initialize()); 

      this.app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        next();
      });

    }

    async routes()  {

      this.app.set('view engine', 'ejs');
      this.app.set('views', path.join(__dirname, 'src', 'views'));
      
      await loadRoutes(this.app, routes);

      this.app.all('*', (req, res, next) => {
        
        console.log('statusCode before creating AppError:', 404); // O el valor que estés pasando
        
        next(new AppError(404, `The requested URL ${req.originalUrl} was not found on this server. Please check the URL for typos or go back to the homepage.`));

      });
      
      this.app.use(globalErrorHandler);

    }

    listen(){

        this.server.listen(this.port,() => {

          logger.info(`Server running on port ${this.port} || ${this.apiVersion}`);

        });
        
    }

    setupLogger() {
      this.app.use(
        expressWinston.logger({
          winstonInstance: logger,
          msg: function (req, res) {
            return `${res.statusCode} - ${req.method} - ${req.url} - ${
              res.responseTime
            }ms from: ${req.protocol}://${req.get('host')}`;
          },
        })
      );
    }

    setupSecurity() {
    }
    
    setupCors() {
      this.app.use(cors(corsOptions.config));
    }

}

export default Server;