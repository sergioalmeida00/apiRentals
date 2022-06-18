import { Category } from "@modules/cars/infra/entities/Category";

interface CreateCategoryDTO{
    name:string;
    description:string;
}

interface ICategoriesRepository{
     create ({name, description}:CreateCategoryDTO): Promise<void>;
     listCattegories(): Promise<Category[]>;
     findByCategory(name:string): Promise<Category>;
}

export {CreateCategoryDTO, ICategoriesRepository}