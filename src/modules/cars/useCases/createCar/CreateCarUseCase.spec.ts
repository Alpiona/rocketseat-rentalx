import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarUseCase from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with license plate already in use', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Name',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'Car Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car2 Name',
        description: 'Car2 Description',
        daily_rate: 102,
        license_plate: 'ABC1234',
        fine_amount: 61,
        brand: 'Car2 Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
