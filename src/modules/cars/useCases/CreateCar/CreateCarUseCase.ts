import { Car } from "@modules/cars/infra/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    name:string;
    description:string;
    daily_rate:number;
    license_plate:string;
    fine_amount:number;
    brand:string;
    category_id:string;
}

@injectable()
export class CreateCarUseCase{
    constructor(
        @inject("CarsRepository")
         private carRepository:ICarRepository
        ){}

    async execute({name,description, daily_rate, license_plate, fine_amount,brand,category_id }:IRequest):Promise<Car>{

        const carAlreadyExists = await this.carRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists){
            throw new AppError("Car already exists!!");
        }

        const car = await this.carRepository.create({
            name,description, daily_rate, license_plate, fine_amount,brand,category_id 
        });

        return car;
    }
}