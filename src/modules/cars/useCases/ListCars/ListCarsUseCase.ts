import { Car } from "@modules/cars/infra/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { inject, injectable } from "tsyringe";


interface IRequest{
    category_id?:string;
    brand?:string;
    name?:string;
}
@injectable()
export class ListCarsUseCase{

    constructor(@inject("CarsRepository") private carRespository:ICarRepository){}


    async execute({category_id, brand, name}:IRequest):Promise<Car[]>{
        const cars = await this.carRespository.findAvailable(category_id, brand, name);
        return cars;
    }
}