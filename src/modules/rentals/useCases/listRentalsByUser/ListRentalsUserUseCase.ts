import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsUserUseCase{

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository:IRentalsRepository
    ){}
    async execute(user_id:string){
        const rentalsUser = await this.rentalsRepository.findUser(user_id);
        return rentalsUser;
    }
}