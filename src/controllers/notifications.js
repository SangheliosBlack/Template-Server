import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';

import  {User}  from "../models/index.js";

import NotificationService from '../services/firebaseCloudMessagingService.js';

var NotificationsController = {

  sendParticularNotification: catchAsync(async (req,res,next)=>{

    try {

      var mensaje = req.body;

      const fcmToken = req.user.fcmToken;

      if(!fcmToken){

        res.status(500).json(RequestUtil.prepareResponse(500, "error",{}, error.response?.data.message ));

      }

      mensaje.tokenId = fcmToken;

      const fcmService = await NotificationService.sendPushToOneUser(mensaje);

      res.status(200).json(RequestUtil.prepareResponse(200, "Notification sent successfully", {message_id: fcmService}));
    
    } catch (error) {

      console.log(error);

      res.status(500).json(RequestUtil.prepareResponse(500, {}, error.response?.data.message ));
    
    }

  }),
  updateFcmToken: catchAsync(async (req,res,next)=>{

    try {

      const {fcmToken} = req.body;

      const userUpdate = await User.findByIdAndUpdate(
        req.user.id, 
        { fcmToken: fcmToken }, 
        { new: true } 
      );
    
    } catch (error) {

      res.status(200).json(RequestUtil.prepareResponse(200, userUpdate, 'Update FCM Token Succesfully' ));
    
    }

  }),


};

export default NotificationsController;