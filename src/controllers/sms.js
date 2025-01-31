import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import axiosSmsInstance from '../services/axiosSmsService.js';

var SmsController = {

  sendSingleSmsTest: catchAsync(async (req, res, next) =>{

    const { msisdn, msg } = req.body;

    try {

      const data = JSON.stringify({
        "message": msg,
        "tpoa": process.env.LABS_MOBILE_TPOA,
        "subid": process.env.LABS_MOBILE_SUBID,
        "test": 1,
        "recipient": [
          {
            "msisdn": msisdn
          }
        ],
      });
  
      const response = await axiosSmsInstance.post('json/send',data);
      
      res.status(200).json(RequestUtil.prepareResponse('success', response, 'Send Single SMS'));

    } catch (error) {
      
      res.status(500).json(RequestUtil.prepareResponse('error', {}, error.response?.data.message ));

    }

  }),
  balance: catchAsync(async(req,res,next)=>{

    const response = await axiosSmsInstance.get('json/balance');

    res.status(200).json(RequestUtil.prepareResponse('success', response, 'Current balance'));

  }),
  sendOTP: catchAsync( async (req,res,next) => {

   try {

      const env = process.env.LABS_MOBILE_ENV;
      const { phone_number, sender } = req.params;
      const message = `Server Template: %CODE% es tu codigo de verificacion ${sender}.`;

      var response1 = await axiosSmsInstance.get(`otp/getEnv?env=${encodeURIComponent(env)}&phone_number=${encodeURIComponent(phone_number)}`);

      const isPendingValidation = response1.find(item => item[1] === "0");

      if(isPendingValidation !== undefined){

        const data = await axiosSmsInstance.get(`otp/resendCode?env=${encodeURIComponent(env)}&sender=${encodeURIComponent(sender)}&phone_number=${encodeURIComponent(phone_number)}&message=${encodeURIComponent(message)}`);

        var response = {
          "message": Constants.smsResendOtp1,
          "status": data 
        }
 
        res.status(200).json(RequestUtil.prepareResponse('success', response, 'OTP sent successfully'));

      }else{

        const data = await axiosSmsInstance.get(`otp/sendCode?env=${encodeURIComponent(env)}&sender=${encodeURIComponent(sender)}&phone_number=${encodeURIComponent(phone_number)}&message=${encodeURIComponent(message)}`);

        var response = {
          "message": Constants.smsOtp1,
          "status": data 
        }
 
        res.status(200).json(RequestUtil.prepareResponse('success', response, 'OTP sent successfully'));

      }
 
    
    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', {}, error.response?.data.message ));

    }

  }),
  resendOTP: catchAsync( async (req,res,next) => {

    try {
 
       const env = process.env.LABS_MOBILE_ENV;
       const sender = process.env.LABS_MOBILE_TPOA;
       const { phone_number } = req.params;
       const message = "Server Template: %CODE% es tu codigo de verificacion.";
  
       const response = await axiosSmsInstance.get(`otp/resendCode?env=${encodeURIComponent(env)}&sender=${encodeURIComponent(sender)}&phone_number=${encodeURIComponent(phone_number)}&message=${encodeURIComponent(message)}`);
  
       res.status(200).json(RequestUtil.prepareResponse('success', response, 'OTP resend successfully'));
     
     } catch (error) {
 
       res.status(500).json(RequestUtil.prepareResponse('error', {}, error.response?.data.message ));
 
     }
 
   }),
   validateCode: catchAsync( async (req,res,next) => {

    try {
 
      const env = process.env.LABS_MOBILE_ENV;
      const { phone_number, code } = req.params;
  
      var data = await axiosSmsInstance.get(`otp/validateCode?env=${encodeURIComponent(env)}&phone_number=${encodeURIComponent(phone_number)}&code=${encodeURIComponent(code)}`);

      var response = {};

      if(data == 0){

        response = {
          "message": Constants.smsValidate0,
          "status": data 
        }

      }else{

        response = {
          "message": Constants.smsValidate1,
          "status": data 
        }

      }
  
      res.status(200).json(RequestUtil.prepareResponse('success', response, 'OTP validate successfully'));
     
    } catch (error) {
 
      res.status(500).json(RequestUtil.prepareResponse('error', {}, error.response?.data.message ));
 
    }
 
  }),
  checkCode: catchAsync( async (req,res,next) => {

    try {
 
      const env = process.env.LABS_MOBILE_ENV;
      const { phone_number } = req.params;
  
      var data = await axiosSmsInstance.get(`otp/checkCode?env=${encodeURIComponent(env)}&phone_number=${encodeURIComponent(phone_number)}`);

      var response = {};

      if(data == 0){

        response = {
          "message": Constants.smsCheck0,
          "status": data 
        }

      }else{

        response = {
          "message": Constants.smsCheck1,
          "status": data 
        }

      }
  
      res.status(200).json(RequestUtil.prepareResponse('success', response, 'OTP checked successfully'));
     
    } catch (error) {
 
      res.status(500).json(RequestUtil.prepareResponse('error', {}, error.response?.data.message ));
 
    }
 
  }),
  getEnvList: catchAsync( async (req,res,next)=>{

    const env = process.env.LABS_MOBILE_ENV;
    const { phone_number } = req.params;
  
    var response = await axiosSmsInstance.get(`otp/getEnv?env=${encodeURIComponent(env)}&phone_number=${encodeURIComponent(phone_number)}`);

    const isPendingValidation = response.find(item => item[1] === "0");

    const data = {
      "is_pending_validation": isPendingValidation !== undefined,
      "otp_list":response
    };

    res.status(200).json(RequestUtil.prepareResponse('success', data, 'List of OTP codes obtained successfully'));

  }),
  catchError: catchAsync(async(req,res,next)=>{

    console.log(req.body);

    res.status(200).json(RequestUtil.prepareResponse('success', req.body, 'List of OTP codes obtained successfully'));

  })
}

export default SmsController;