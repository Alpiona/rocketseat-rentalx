import { Router } from 'express';

import { authenticateRoute } from './authenticate.routes';
import { carsRoute } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoute } from './password.routes';
import { rentalRoute } from './rental.routes';
import { specificationsRoute } from './specifications.routes';
import { usersRoute } from './users.routes';

export const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoute);
router.use('/users', usersRoute);
router.use('/cars', carsRoute);
router.use('/rental', rentalRoute);
router.use('/password', passwordRoute);
router.use(authenticateRoute);
