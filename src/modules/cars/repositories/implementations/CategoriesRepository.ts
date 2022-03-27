import { Category } from "../../model/Category";


interface CreateCategoryDTO{
    name:string;
    description:string;
}

export class CategoriesRepository {    
    
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    constructor(){
        this.categories = [];
    }

    public static getInstance():CategoriesRepository{
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }

    create({name, description}:CreateCategoryDTO ){

        const category = new Category();
        Object.assign(category,{
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);

        return category;

    }

    listCattegories(): Category[] {
        console.log(this.categories)
        return this.categories;
    }

    findByCategory(name:string): Category{
        const category = this.categories.find(category => category.name === name);

        return category;
    }
}