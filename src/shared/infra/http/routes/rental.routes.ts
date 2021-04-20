import { Router } from 'express';

import CreateRentalController from '@modules/rentals/useCases/createRental/CreateRentalController';
import DevolutionRentalController from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import ListRentalsByUserController from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalRoute = Router();

const createRentalController = new CreateRentalController();
rentalRoute.post('/', ensureAuthenticated, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();
rentalRoute.patch(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

const listRentalsByUserController = new ListRentalsByUserController();
rentalRoute.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalRoute };
