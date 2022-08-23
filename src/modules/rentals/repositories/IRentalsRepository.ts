import { Rental } from "@modules/rentals/infra/entities/Rental";
import { ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO"

interface IRentalsRepository{
    create(data:ICreateRentalDTO):Promise<Rental>;
    findOpenRentalByCar(car_id:string):Promise<Rental>;
    findOpenRentalByUser(user_id:string):Promise<Rental>;
    findById(id:string):Promise<Rental>;
    
}

export { IRentalsRepository }