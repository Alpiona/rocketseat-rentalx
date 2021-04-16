import { Router } from 'express';

import AuthenticateUserController from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

export const authenticateRoute = Router();

const authenticateUerController = new AuthenticateUserController();

authenticateRoute.post('/sessions', authenticateUerController.handle);
