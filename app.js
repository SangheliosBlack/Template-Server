const {connectToDatabase} = require('./src/database/config');
const corsOptions = require('./src/utils/cors_config');
const compression = require('compression');
const bodyParser = require('body-parser')
const passport = require('passport');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const path = require('path');

const trim_json_values = require('./src/utils/trim_json_values');
const expressWinston = require('express-winston')
const xss = require('xss-clean')

const swaggerOptions = require('./src/utils/swagger_config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const globalErrorHandler = require('./src/controllers/errorController');
const AppError = require('./src/utils/appError');
const logger = require('./src/helpers/logger');

require('dotenv').config();

class Server {

    constructor(){
        
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development'
        this.apiVersion = `/api/${process.env.API_VERSION || 'v1'}`;

        module.exports.io = require('socket.io')(this.server);
        require('./src/sockets/socket');

        this.paths = {

            auth:'/auth',
            usuario:'/usuario',

        }

        this.middlewares();
        this.conectarDB();
        this.routes();

    }


    async conectarDB(){

        await connectToDatabase();

    }

    middlewares(){

      this.setupLogger();
      this.setupSecurity();
      this.setupCors();

      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions.options,)));

      this.app.get('/api-docs.json',(req,res)=>{
        res.setHeader('Content-Type','application/json');
        res.send(swaggerJsdoc(swaggerOptions.options));
      });


      this.app.use(express.static(path.resolve(__dirname,'public')));
      this.app.use(bodyParser.json(),trim_json_values);
      this.app.use(compression());

      if (process.env.NODE_ENV !== 'production') {
        this.app.use(morgan('dev'));
      }

      this.app.use(
        bodyParser.urlencoded({
          limit: '50mb',
          extended: true,
        })
      );

      require('./src/config/authentication');
      this.app.use(passport.initialize()); 

      this.app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        next();
      });

    }

    routes(){

      this.app.set('view engine', 'ejs');

      this.app.use(`${this.apiVersion}${this.paths.auth}`,       require('./src/routes/autentificacion'));
      this.app.use(`${this.apiVersion}${this.paths.usuario}`,    require('./src/routes/usuarios'));

      this.app.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
      });

      this.app.use(globalErrorHandler);

    }

    listen(){

        this.server.listen(this.port,()=>{

          logger.info(`Server running on port ${this,this.port}`);

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
      
      this.app.use(xss());
    }
    
    setupCors() {
      this.app.use(cors(corsOptions.config));
    }

}

module.exports = Server                     ;