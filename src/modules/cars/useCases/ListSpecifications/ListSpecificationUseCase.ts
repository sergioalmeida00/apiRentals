import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationReposytory";

@injectable()
export class ListSpecificationUseCase{
    private specificationRepository:ISpecificationRepository;

    constructor(@inject("SpecificationRepository") specificationRepository:ISpecificationRepository){
        this.specificationRepository = specificationRepository;
    }

    async execute(){
        const resultSpecifications = await this.specificationRepository.listSpecification();

        return resultSpecifications;
    }
}