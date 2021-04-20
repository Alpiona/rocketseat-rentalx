import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import DayjsDateProvider from '@shared/providers/implementations/DayjsDateProvider';

import CreateRentalUseCase from './CreateRentalUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  const nowPlus24hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({});

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '11111',
      expected_return_date: nowPlus24hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if user has open rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '11111',
        expected_return_date: nowPlus24hours,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '222222',
        expected_return_date: nowPlus24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if user has open rental', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '11111',
      expected_return_date: nowPlus24hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '54321',
        car_id: '11111',
        expected_return_date: nowPlus24hours,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if user has open rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '11111',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toEqual(new AppError('Testing result of test'));
  });
});
