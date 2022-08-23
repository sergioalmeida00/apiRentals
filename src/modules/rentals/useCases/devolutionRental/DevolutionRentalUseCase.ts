import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest{
    id:string;
    user_id:string;
}

@injectable()
export class DevolutionRentalUseCase{

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository:IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository:ICarRepository,
        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider
    ){}

    async execute({id,user_id}:IRequest):Promise<Rental>{
        const minimum_daily = 1;
        let total = 0;
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);

        if(!rental) {
            throw new AppError("Rental does not exists!");
        }

        const dateNow = this.dateProvider.dateNow();

        let dailyValue = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );
        
        if(dailyValue <= 0){
            dailyValue = minimum_daily; 
        }

        let delayValue = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        );

        if(delayValue > 0){
            const calculate_fine = delayValue * car.fine_amount;
            total = calculate_fine;
        }

        total += dailyValue * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id,true);

        return rental;

    }
}