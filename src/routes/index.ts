import { Router } from 'express';

import { authenticateRoute } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoute } from './specifications.routes';
import { usersRoute } from './users.routes';

export const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoute);
router.use('/users', usersRoute);
router.use(authenticateRoute);
