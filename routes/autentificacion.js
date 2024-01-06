const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const messageErrors = require('../utils/messages_errors');
const {Router} = require('express');
const upload = require("../utils/multer");
const validateName = require('../middlewares/validate_name');
const validatePassword = require('../middlewares/validate-password');
const checkPermissions = require('../middlewares/checkPermissions');
const router = Router();
const passport = require('passport');

router.post('/createUser',[
    check('name').trim().not().isEmpty().withMessage(messageErrors.NOMBRE_OBLIGATORIO).custom(validateName),
    check('phone').isLength({ min: 10, max: 10 }).withMessage(messageErrors.NUMERO_CELULAR_INVALIDO),
    check('password').trim().isLength({ min: 6, max: 16 }).withMessage(messageErrors.CONTRASENA_MINIMO_CARACTERES).custom(validatePassword),
    check('email').trim().isEmail().withMessage(messageErrors.CORREO_NO_VALIDO),
    validarCampos
],controller.crearUsuario);

router.post('/login',[
    check('password',messageErrors.CONTRASENA_NO_COINCIDE).not().isEmpty(),
    check('email',messageErrors.CORREO_NO_VALIDO).isEmail(),
    validarCampos
],controller.login);

router.use(passport.authenticate('jwt', { session: false }));

router.get('/renewCode',checkPermissions('read','all'),controller.renovarToken);

module.exports = router;