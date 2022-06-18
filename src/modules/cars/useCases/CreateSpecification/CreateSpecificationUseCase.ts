import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationReposytory";
import { AppError } from "@shared/erros/AppError";

interface SpecificationUseCase{
    name_specification: string;
    description_specification:string;
}

@injectable()
export class CreateSpecificationUseCase{

    private specificationsRepository: ISpecificationRepository;

    constructor(@inject("SpecificationRepository") specificationsRepository:ISpecificationRepository){
        this.specificationsRepository = specificationsRepository;
    }
    
    async execute({name_specification,description_specification}:SpecificationUseCase){

        const specificationAlreadyExists =await this.specificationsRepository.findBySpecification(name_specification);
        
        if(specificationAlreadyExists){
            throw new AppError("Specification already exists");
        }

       const resultSpecification = await this.specificationsRepository.create({name_specification,description_specification});

       return resultSpecification;
       
    }
}