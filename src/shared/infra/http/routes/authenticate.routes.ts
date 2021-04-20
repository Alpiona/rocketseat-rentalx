import { Router } from 'express';

import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import RefreshTokenController from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

export const authenticateRoute = Router();

const authenticateUerController = new AuthenticateUserController();
authenticateRoute.post('/sessions', authenticateUerController.handle);

const refreshTokenController = new RefreshTokenController();
authenticateRoute.post('/refresh-token', refreshTokenController.handle);
