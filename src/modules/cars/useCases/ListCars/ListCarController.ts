import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarController {
    async handle (request:Request, response:Response):Promise<Response>{
        const {category_id, brand, name} = request.query;

        const listAvailableCarsUseCase = container.resolve(ListCarsUseCase);

        const car = await listAvailableCarsUseCase.execute({
            category_id: category_id as string,
            brand: brand as string,
            name: name as string
        });
        return response.json({car});
    }
}