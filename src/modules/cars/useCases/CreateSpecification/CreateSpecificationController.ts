import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container } from "tsyringe";
export class CreateSpecificationController{

   
   async handle(request: Request, response: Response){
        const {name_specification,description_specification} = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        const resultCreateSpecification = await createSpecificationUseCase.execute({name_specification,description_specification});

        return response.status(201).json(resultCreateSpecification);
    }
}