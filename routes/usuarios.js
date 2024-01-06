const { validarJWT } = require('../middlewares/validar-jwt');
const controller = require('../controllers/usuarios');
const {Router} = require('express');

const upload = require("../utils/multer");

const router = Router();

router.post('/guardarFotoPerfil',validarJWT,upload.single("photo"),controller.guardarFotoPerfil)

module.exports = router;