import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController{
    private listspecificationUseCase: ListSpecificationUseCase;

    constructor(listspecificationUseCase:ListSpecificationUseCase){
        this.listspecificationUseCase = listspecificationUseCase;
    }

    handle(request:Request, response:Response){
        const resultListSpecification = this.listspecificationUseCase.execute();

        return response.status(201).json({resultListSpecification});
    }
}