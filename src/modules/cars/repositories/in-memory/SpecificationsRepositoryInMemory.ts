import { Specification } from "@modules/cars/infra/entities/Specification";
import { ISpecificationRepository, SpecificationDTO } from "../ISpecificationReposytory";

export class SpecificationsRepositoryInMemory implements ISpecificationRepository{

    specifications:Specification[] = [];

    async create({ name_specification, description_specification }: SpecificationDTO): Promise<Specification> {
      
        const specification = new Specification();

        Object.assign(specification,{
            name_specification,
            description_specification
        });

        this.specifications.push(specification);

        return specification;
    }
    async findBySpecification(name: string): Promise<Specification> {
       return this.specifications.find(specification => specification.name_specification === name);
    }
    async listSpecification(): Promise<Specification[]> {
       return this.specifications;
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(sepecification => ids.includes(sepecification.id_specification));
        return allSpecifications;
    }

}