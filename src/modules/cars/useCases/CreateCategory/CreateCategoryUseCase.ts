import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

CategoriesRepository

interface CategoryUseCase{
    name:string;
    description:string;
}
export class CreateCategoryUseCase{

    private categoriesRepository:CategoriesRepository;

    constructor(categoriesRepository:CategoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }
    
    execute({name, description} :CategoryUseCase ){

        const categoryAlreadyExists = this.categoriesRepository.findByCategory(name);

        if(categoryAlreadyExists){
            throw new Error("Category already exists!!");
        }
    
        const resultCategory = this.categoriesRepository.create({name, description});

        return resultCategory;
    }
}