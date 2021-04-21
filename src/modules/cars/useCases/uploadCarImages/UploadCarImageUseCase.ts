import { inject } from 'tsyringe';

import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';
import IStorageProvider from '@shared/providers/IStorageProvider';

interface IRequest {
  car_id: string;
  images_name: string[];
}

export default class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}
