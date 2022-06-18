import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/entities/Specification";
import { ISpecificationRepository, SpecificationDTO } from "@modules/cars/repositories/ISpecificationReposytory";



// interface SpecificationDTO{
//     name_specification: string;
//     description_specification:string;
// }

export class SpecificationRepository implements ISpecificationRepository{


    private repository: Repository<Specification>


    constructor(){
        this.repository = getRepository(Specification);
    }

    async create({name_specification,description_specification}:SpecificationDTO):Promise<Specification>{
        const specification = await this.repository.create({
            name_specification,
            description_specification
        });

        await this.repository.save(specification)

        return specification;
    }

   async findBySpecification(name:string):Promise<Specification>{
        const specification = await this.repository.findOne({
            where:{
                name_specification:name
            }
        })
        return specification;
    }

    async listSpecification(): Promise<Specification[]>{
       const retult = await this.repository.find();

       return retult;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }
}