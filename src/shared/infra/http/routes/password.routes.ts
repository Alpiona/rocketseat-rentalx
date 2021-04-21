import { Router } from 'express';

import ResetPasswordUserController from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import SendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoute = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordRoute.post('/forgot', sendForgotPasswordMailController.handle);

const resetPasswordUserController = new ResetPasswordUserController();
passwordRoute.post('/reset', resetPasswordUserController.handle);

export { passwordRoute };
