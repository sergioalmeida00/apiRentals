import { Category } from "@modules/cars/infra/entities/Category";
import { getRepository, Repository } from "typeorm";
import { ICategoriesRepository,CreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";


export class CategoriesRepository implements ICategoriesRepository{        

    private repository: Repository<Category>;

    constructor(){
        this.repository = getRepository(Category);
    }

    async create({name, description}:CreateCategoryDTO ):Promise<Category> {

        const category = await this.repository.create({
            description,
            name
        });
        
        await this.repository.save(category);

        return category;

    }

    async listCattegories(): Promise<Category[]>{
        const categories = await this.repository.find();

        return categories;
    }

    async findByCategory(name:string): Promise<Category>{

        const category = await this.repository.findOne({
            where:{name}
        });
        return category;
    }
}