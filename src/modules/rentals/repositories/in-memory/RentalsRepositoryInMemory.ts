import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository{


    rentals:Rental[] = [];  

    async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental,{
            user_id,
             car_id, 
             expected_return_date,
             start_date: new Date()
        });
        
        this.rentals.push(rental);
        return rental;
    }
   
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === id);
    }
    async findUser(user_id: string): Promise<Rental[]> {
       return this.rentals.filter((rental) => rental.user_id === user_id);
    }

}