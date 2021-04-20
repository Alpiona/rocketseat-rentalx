import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsController from '@modules/cars/useCases/listCars/ListAvailableCarsController';
import UploadCarImagesController from '@modules/cars/useCases/uploadCarImages/UploadCarImageController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig.upload('./tmp/cars'));

const carsRoute = Router();

const createCarController = new CreateCarController();
carsRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoute.get('/available', listAvailableCarsController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carsRoute.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

const uploadCarImageController = new UploadCarImagesController();
carsRoute.post(
  '/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle,
);

export { carsRoute };
