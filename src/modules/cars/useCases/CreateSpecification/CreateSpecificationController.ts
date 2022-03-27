import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController{
    private createSpecificationUseCase:CreateSpecificationUseCase;

    constructor(createSpecificationUseCase:CreateSpecificationUseCase){
        this.createSpecificationUseCase = createSpecificationUseCase;
    }

    handle(request: Request, response: Response){
        const {name_specification,description_specification} = request.body;

        const resultCreateSpecification = this.createSpecificationUseCase.execute({name_specification,description_specification});

        return response.status(201).json({resultCreateSpecification});
    }
}