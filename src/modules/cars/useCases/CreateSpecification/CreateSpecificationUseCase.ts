import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";


interface SpecificationUseCase{
    name_specification: string;
    description_specification:string;
}

export class CreateSpecificationUseCase{

    private specificationsRepository: SpecificationRepository;

    constructor(specificationsRepository:SpecificationRepository){
        this.specificationsRepository = specificationsRepository;
    }
    
    execute({name_specification,description_specification}:SpecificationUseCase){

        const specificationAlreadyExists = this.specificationsRepository.findBySpecification(name_specification);
        
        if(specificationAlreadyExists){
            throw new Error("Specification already exists!!");
        }

       const resultSpecification = this.specificationsRepository.create({name_specification,description_specification});

       return resultSpecification;
       
    }
}