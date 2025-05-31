import User from '../models/user.js';
import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';

var UserController = {
  
  getUserMe : catchAsync(async (req, res, next) => {

    console.log(req.user);

    const userId = req.user.id;

    const user = await User.findById({_id:userId});

    res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'User me', user));

  }),
  getAllUsers: catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json(RequestUtil.prepareResponse('SUCCESS', users, 'List of users'));

  }),
  getUserById: catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){

      return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'User not found'));

    }

    res.status(200).json(RequestUtil.prepareResponse('SUCCESS', user, 'User by id'));

  }),
  updateUser: catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(!user){

      return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'User not found'));

    }

    res.status(200).json(RequestUtil.prepareResponse('SUCCESS', user, 'User updated'));

  }),
  deleteUser: catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){

      return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'User not found'));

    }

    res.status(200).json(RequestUtil.prepareResponse('SUCCESS', { ok: true }, 'User deleted'));

  })
  
}

export default UserController;