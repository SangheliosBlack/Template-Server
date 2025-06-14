import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import {HeaderAPIKeyStrategy} from 'passport-headerapikey';
import { ExtractJwt as ExtractJWT} from 'passport-jwt';
import passport from 'passport';

import getTokenHeader from '../utils/headerUtil.js';
import authConfig from './jwtConfig.js';
import { User } from "../models/index.js";

import jwt from 'jsonwebtoken';

const getUser = async (id) => {
  return await User.findById(id);
};

const jwtOptions = {
  secretOrKey: `${authConfig.secret}`,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

passport.use(
  'refreshToken',
  new JwtStrategy(
    jwtOptions,
    async (req, payload, done) => {
      try {
        
        const token = getTokenHeader(req);

        const payload = jwt.verify(token, authConfig.secret, { ignoreExpiration: true,issuer:process.env.JWT_KEY});

        const user = await User.findById({_id:payload.id});

        const isExpired = payload.exp && Date.now() >= payload.exp * 1000;

        if (isExpired) {

          console.log('The token has expired');

        } else {

          console.log('The token is still valid');

        }

        return done(null, user, { message: 'Refresh successful' });

      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({email:email});

        if (!user) {
          return done(null, false, {
            message: 'Usuario y/o contraseña incorrecta'
          });
        }

        const validate = await user.validatePassword(password);
        
        if (!validate) {
          return done(null, false, {
            message: 'Usuario y/o contraseña incorrecta'
          });
        }

        user.last_login_date = Date.now();
        
        user.online = true;

        await user.save();

        return done(null, user, { message: 'Inicio exitoso' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    jwtOptions,
    async (req, jwt_payload, done) => {
      try {

        const token = getTokenHeader(req);
        if (!token) {
          return done(null, false, {
            message: 'No se encontró un token válido',
          });
        }

        const user = await getUser(jwt_payload.id);

        if (!user) {
          return done(null, false, {
            message: 'Token inválido',
          });
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'API-Key ' },
    false,
    async function (apikey, done) {
      try {
        console.log('REVISION APIKEY');
        return done(null, {});
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
