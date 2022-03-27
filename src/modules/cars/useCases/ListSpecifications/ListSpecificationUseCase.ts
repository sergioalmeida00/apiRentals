import { Request } from "express";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

export class ListSpecificationUseCase{
    private specificationRepository:SpecificationRepository;

    constructor(specificationRepository:SpecificationRepository){
        this.specificationRepository = specificationRepository;
    }

    execute(){
        const resultSpecifications = this.specificationRepository.listSpecification();

        return resultSpecifications;
    }
}