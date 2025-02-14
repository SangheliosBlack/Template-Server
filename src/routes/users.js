import Router from 'express';
import passport  from 'passport';

import UserController from '../controllers/users.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/user/index.js'

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get("/", checkPermissions('read', 'all'), UserController.getAllUsers);

router.get("/:id", checkPermissions('read', 'all'), validateMongoId, UserController.getUserById);

router.patch("/:id", checkPermissions('read', 'all'), validateMongoId, validateSchema(validator.userUpdateSchema), UserController.updateUser);

router.delete("/:id", checkPermissions('read', 'all'), validateMongoId, UserController.deleteUser);

export default router;