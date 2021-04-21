import { container } from 'tsyringe';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import CarsImagesRepository from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/providers/IDateProvider';
import IMailProvider from '@shared/providers/IMailProvider';
import DayjsDateProvider from '@shared/providers/implementations/DayjsDateProvider';
import EtherealMailProvider from '@shared/providers/implementations/EtherealMailProvider';
import LocalStorageProvider from '@shared/providers/implementations/LocalStorageProvider';
import S3StorageProvider from '@shared/providers/implementations/S3StorageProvider';
import SESMAilProvider from '@shared/providers/implementations/SESMailProvider';
import IStorageProvider from '@shared/providers/IStorageProvider';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMAilProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk],
);
