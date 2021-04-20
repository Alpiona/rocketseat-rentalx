import { inject, injectable } from 'tsyringe';

import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationsRepository.create({ name, description });
  }
}
