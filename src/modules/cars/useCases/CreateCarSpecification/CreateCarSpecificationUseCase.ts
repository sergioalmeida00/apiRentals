import { Car } from "@modules/cars/infra/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationReposytory";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id:string;
    specification_id:string[];
}
@injectable()
export class CreateCarSpecificationUseCase{

    constructor(
        @inject("CarsRepository")
        private carRespository:ICarRepository,
        @inject("SpecificationRepository")
        private specificationRepository:ISpecificationRepository
    ){}
    
    async execute({car_id,specification_id}:IRequest):Promise<Car>{
        
        const carExists = await this.carRespository.findById(car_id);

        if(!carExists){
            throw new AppError("Car does not Exists!!");
        }

        const specifications = await this.specificationRepository.findByIds(specification_id);

        carExists.specifications = specifications;
        
        await this.carRespository.create(carExists);
        
        return carExists;
        
    }
}