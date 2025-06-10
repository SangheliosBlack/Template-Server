import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';

var HomeController = {

  hello: catchAsync(async (req,res,next)=>{

    return res.status(200).render('hello', { message: 'Hello from EJS!' });

  })

}

export default HomeController;
