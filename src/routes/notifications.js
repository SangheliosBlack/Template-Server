import Router from 'express';
import passport from 'passport';

import NotificationsController  from '../controllers/notifications.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/notifications/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.post("/", checkPermissions('read','all'), validateSchema(validator.smsNotificationSend),NotificationsController.sendParticularNotification);

router.post("/updateFcmToken", checkPermissions('read','all'), validateSchema(validator.updateNotificationToken),NotificationsController.updateFcmToken);

export default router;