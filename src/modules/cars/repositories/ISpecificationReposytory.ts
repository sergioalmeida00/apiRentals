import { Specification } from "@modules/cars/infra/entities/Specification";

interface SpecificationDTO{
    name_specification: string;
    description_specification:string;
}

interface ISpecificationRepository{
    create({name_specification,description_specification}:SpecificationDTO ):Promise<Specification>;
    findBySpecification(name:string):Promise<Specification>;
    listSpecification():Promise<Specification[]>;
    findByIds(ids:string[]):Promise<Specification[]>;
}

export {SpecificationDTO,ISpecificationRepository}