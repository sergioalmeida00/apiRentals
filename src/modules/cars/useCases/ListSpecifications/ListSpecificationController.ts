import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController{

   async handle(request:Request, response:Response):Promise<Response>{
        const listspecificationUseCase = container.resolve(ListSpecificationUseCase)
        const resultListSpecification = await listspecificationUseCase.execute();

        return response.status(201).json({resultListSpecification});
    }
}