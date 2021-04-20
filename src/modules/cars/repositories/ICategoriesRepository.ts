import Category from '../infra/typeorm/entities/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
}
