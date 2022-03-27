import { Category } from "../../model/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export class ListCategoriesUseCase{
    private categoriesRepository: CategoriesRepository;

    constructor(categoriesRepository:CategoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    execute():Category[]{
        const listAll = this.categoriesRepository.listCattegories();
       
        return listAll;
    }
}