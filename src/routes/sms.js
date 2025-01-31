import Router from 'express';
import passport from 'passport';

import SmsController  from '../controllers/sms.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/sms/index.js'

const router = Router();

//router.use(passport.authenticate('jwt', {session: false}));

router.post("/sendSingleSmsTest", checkPermissions('read','all'), validateSchema(validator.smsSingleSend),SmsController.sendSingleSmsTest);

router.get("/balance",checkPermissions('read','all'),SmsController.balance);

//router.get('/otp/sendOtp/:phone_number/:sender',checkPermissions('read','all'),SmsController.sendOTP);
router.get('/otp/sendOtp/:phone_number/:sender',SmsController.sendOTP);

router.get('/otp/resendOtp/:phone_number',checkPermissions('read','all'),SmsController.resendOTP);

router.get('/otp/validateCode/:phone_number/:code',checkPermissions('read','all'),SmsController.validateCode);

router.get('/otp/checkCode/:phone_number',checkPermissions('read','all'),SmsController.checkCode);

router.get('/otp/getEnvList/:phone_number',checkPermissions('read','read'),SmsController.getEnvList);


router.get('/opt/cathError',SmsController.catchError)

export default router;