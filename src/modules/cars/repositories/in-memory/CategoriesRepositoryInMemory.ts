import { Category } from "@modules/cars/infra/entities/Category";
import { CreateCategoryDTO, ICategoriesRepository } from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository{

    categories: Category[] = [];

    async create({ name, description }: CreateCategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category,{
            name, description
        });
        this.categories.push(category);
    }
    async listCattegories(): Promise<Category[]> {
        const listCategories = this.categories;
        return listCategories;
    }
    async findByCategory(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);
        return category;
    }

}