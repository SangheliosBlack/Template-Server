import Router from 'express';
import passport from 'passport';
import checkPermissions from '../middlewares/checkPermissions.js';
import validateFile from '../middlewares/validateFile.js';

import upload from '../config/multer.js';

import UploadController from '../controllers/upload.js';

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.post("/testUpload", checkPermissions('read','all'),upload.single('invoice'),validateFile,UploadController.uploadTest);

export default router;