const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require("../models/user");
const { HeaderAPIKeyStrategy } = require('passport-headerapikey');

const ExtractJWT = require('passport-jwt').ExtractJwt;

const authConfig = require('./jwtConfig');
const headerUtil = require('../utils/headerUtil');

const getUser = async (email) => {
  return await User.findOne({email:email});
};

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
            message: 'Usuario y/o contraseña incorrecta',
          });
        }

        const validate = await user.validatePassword(password);
        if (!validate) {
          return done(null, false, {
            message: 'Usuario y/o contraseña incorrecta',
          });
        }

        //update instance
        user.last_login_date = Date.now();
        await user.save();

        // Send the user information to the next middleware
        return done(null, user, { message: 'Inicio exitoso' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// This verifies that the token sent by the user is valid
const jwtOptions = {
  secretOrKey: `${authConfig.secret}`,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

passport.use(
  new JwtStrategy(
    jwtOptions,
    // eslint-disable-next-line consistent-return
    async (req, jwt_payload, done) => {
      try {
        const token = headerUtil.getTokenHeader(req);
        if (!token) {
          return done(null, false, {
            message: 'No se encontró un token válido',
          });
        }

        // Find the user associated with the email provided by the user
        const user = await getUser(jwt_payload.email);

        if (!user) {
          // If the user isn't found in the database, return a message
          return done(null, false, {
            message: 'Token inválido',
          });
        }

        // Send the user information to the next middleware
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
