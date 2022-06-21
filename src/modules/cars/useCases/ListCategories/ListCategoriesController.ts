import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


export class ListCategoriesController{


    async handle(request:Request, response:Response):Promise<Response>{
        const listCategorisUseCase = container.resolve(ListCategoriesUseCase);
        const listAll = await listCategorisUseCase.execute();       

        return response.status(201).json(listAll);
    }
}