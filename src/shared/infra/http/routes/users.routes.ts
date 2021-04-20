import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserController';
import UpdateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

export const usersRoute = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
usersRoute.post('/', createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);
