import { inject,injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/erros/AppError";



interface CategoryUseCase{
    name:string;
    description:string;
}

@injectable()
export class CreateCategoryUseCase{


    constructor(@inject("CategoriesRepository") private categoriesRepository:ICategoriesRepository){}
    
    async execute({name, description} :CategoryUseCase ){

        const categoryAlreadyExists = await this.categoriesRepository.findByCategory(name);

        if(categoryAlreadyExists){
            throw new AppError("Category already exists!!");
        }
    
        const resultCategory = this.categoriesRepository.create({name, description});

        return resultCategory;
    }
}