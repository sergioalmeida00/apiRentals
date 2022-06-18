import { ICreateDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/entities/Car";

interface ICarRepository{
    create(data:ICreateDTO):Promise<Car>;
    findByLicensePlate(license_plate:string): Promise<Car>;
    findAvailable(category_id?:string, brand?:string, name?:string):Promise<Car[]>;
    findById(car_id:string):Promise<Car>;
}

export {ICarRepository}