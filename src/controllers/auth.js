import jwthelper from "../helpers/jwt.js";
import { User } from "../models/index.js";
import catchAsync from '../utils/catchAsync.js';
import RequestUtil from '../utils/requestUtils.js';
import AppError from '../utils/appError.js';
import authConfig from '../config/jwtConfig.js';
import passport from "passport";
import jwt from 'jsonwebtoken';
import Roles from '../constants/roles.js';

const TOKEN_TIMEOUT = 86400;

const AuthController = {
  crearUsuario: catchAsync(async (req, res, next) => {
    const { email, password,phone} = req.body;

    try {
      const existEmail = await User.findOne({ email: email.toLowerCase() });
      const existPhone = await User.findOne({ phone: phone})

      if (existEmail) {
        return res.status(400).json(
          RequestUtil.prepareResponse(
            'success',
            `Este correo electrónico ya está registrado`,
            {},
          )
        );
      }

      if(existPhone){
        return res.status(400).json(
          RequestUtil.prepareResponse(
            'success',
            `Este numero telefonico ya está registrado`,
            {},
          )
        );
      }

      const user = new User(req.body);
      const str = req.body.full_name.toLowerCase();
      const arr = str.split(" ");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      const newName = arr.join(" ");

      user.name = newName;
      user.email = email.toLowerCase();
      user.phone = phone;
      user.role = Roles.USER;

      await user.save();

      const accessToken = await jwthelper.generarJWT(user.id);

      return res.status(200).json(
        RequestUtil.prepareResponse(
          'success',
          {
            user,
            accessToken
          },
          `Usuario creado con éxito`
        )
      );

    } catch (error) {

      console.log(error);

      return next(
        new AppError(
          500,
          'An error occurred in this operation.',
          'APP_00',
          'data',
          [{ message: error.message }]
        )
      );
    }
  }),
  login: catchAsync(async (req, res,next) => {

    passport.authenticate(
      'login',
      { session: false },
      async(err,user,_info)=>{

        try {

          if (err || !user || user === false) {
            
            return res.status(401).json({
              status: 'fail',
              message: 'Invalid credentials. Please check your email and password and try again.'
            });

          }

          req.login(user,{session: false}, async(error)=>{
            
            if(error) return next(error);

            const accessToken = await jwthelper.generarJWT(user.id);

            return res.status(200).json(
              RequestUtil.prepareResponse(
                'success',
                `Login successful`,
                {
                  user,
                  accessToken
                },
              )
            );

          })

        } catch (error) {
          return next(error);
        }
      }
    )(req,res,next);

  }),
  refreshToken: async (req, res, next) => {

    passport.authenticate(
      'refreshToken',
      { session: false },
      async(err,user,_info)=>{

        try {
          
          //User not found can be reached if the token is expired
          if( user === undefined || user === null){

            return res.status(401).json({
              status: 'fail',
              message: 'Unauthorized: token issuer is not recognized.'
            });

          }

          const accessToken = await jwthelper.generarJWT(user.id);

          return res.status(200).json(
            RequestUtil.prepareResponse(
              'success',
              `Refresh token successful.`,
              {
                accessToken
              },
            )
          );

        } catch (error) {
          return next(error);
        }
      }
    )(req,res,next);

  }
};

export function   restrictTo(...roles)  {     return (req, res, next) => {
    //roles is an array of strings
    const userRoles = req.user.roles.map((role) => {
      return role.dataValues.code;
    });

    if (!roles.some((r) => userRoles.includes(r))) {
      return next(
        new AppError(
          403,
          'El rol no cuenta con permisos para realizar esta acción',
          'rol'
        )
      );
    }
    next();
  };   }

const createSendToken = (user, status, req, res) => {
  const payload = {
    email: user.email,
  };

  const token = signToken(payload);

  return res.status(status).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        online: user.online,
        createdAt: user.createdAt,
        last_connection: user.last_connection
      },
      accessToken: `${token}`,
      expiresIn: `24h`,
  });
};

export default AuthController;