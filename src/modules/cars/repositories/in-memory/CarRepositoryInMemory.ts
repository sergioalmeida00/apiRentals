import { ICreateDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/entities/Car";
import { ICarRepository } from "../ICarRepository";



export class CarRepositoryInMemory implements ICarRepository{


    cars:Car[] =[];

    async create({name,description, daily_rate, license_plate, fine_amount,brand,category_id, specifications,id}: ICreateDTO): Promise<Car> {
        const car = new Car();
        
        Object.assign(car, {
            name,description, daily_rate, license_plate, fine_amount,brand,category_id,specifications,...(id && {id})
        });

        this.cars.push(car);
        return car;
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }
    
    async findAvailable(category_id?:string, brand?:string, name?:string): Promise<Car[]> {
        const all = this.cars.filter((car)=>{

            if(car.available === true || (brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name )){
                return car;
            }
            return null;
        });

        return all;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
      }
}