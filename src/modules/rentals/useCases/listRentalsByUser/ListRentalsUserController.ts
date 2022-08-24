import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsUserUseCase } from "./ListRentalsUserUseCase";

export class ListRentalsController{
    async handle(request: Request, response: Response):Promise<Response>{
        const listRentalsUserUseCase = container.resolve(ListRentalsUserUseCase);
        const {id} = request.user;

        const rentalsList = await listRentalsUserUseCase.execute(id);

        return response.status(200).json(rentalsList);        
    }
}