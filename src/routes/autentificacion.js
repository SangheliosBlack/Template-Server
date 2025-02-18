import validarCampos from '../middlewares/validar-campos.js';
import { AuthController }  from '../controllers/index.js';
import { check } from 'express-validator';
import ERROR_MESSAGES  from '../utils/messages_errors.js';
import Router from 'express';
import validateName from '../middlewares/validate_name.js';
import validatePassword from '../middlewares/validate-password.js';
import checkPermissions from '../middlewares/checkPermissions.js';
const router = Router();

import passport from 'passport';

router.post('/createUser',[
    check('full_name').trim().not().isEmpty().withMessage(ERROR_MESSAGES.NOMBRE_OBLIGATORIO).custom(validateName),
    check('phone').isLength({ min: 10, max: 10 }).withMessage(ERROR_MESSAGES.NUMERO_CELULAR_INVALIDO),
    check('password').trim().isLength({ min: 6, max: 16 }).withMessage(ERROR_MESSAGES.CONTRASENA_MINIMO_CARACTERES).custom(validatePassword),
    check('email').trim().isEmail().withMessage(ERROR_MESSAGES.CORREO_NO_VALIDO),
    validarCampos
],AuthController.crearUsuario);

router.post('/login',[
    check('password',ERROR_MESSAGES.CONTRASENA_NO_COINCIDE).not().isEmpty(),
    check('email',ERROR_MESSAGES.CORREO_NO_VALIDO).isEmail(),
    validarCampos
],AuthController.login);

router.use(passport.authenticate('jwt', { session: false }));

router.post('/refreshToken',checkPermissions('read','all'),AuthController.refreshToken);

export default router;