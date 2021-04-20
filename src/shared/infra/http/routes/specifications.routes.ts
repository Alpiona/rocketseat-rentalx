import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const specificationsRoute = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRoute };
