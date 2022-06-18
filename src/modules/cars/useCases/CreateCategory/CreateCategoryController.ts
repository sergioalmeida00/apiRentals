import {Request,Response} from 'express'
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController{
    
    // private createCategoryUseCase:CreateCategoryUseCase;

    // constructor(createCategoryUseCase:CreateCategoryUseCase){
        
    //     this.createCategoryUseCase = createCategoryUseCase;
    // }

    async handle(request:Request, response:Response){
        const {name, description} = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        const resultCategory = await createCategoryUseCase.execute({name,description});  

        return response.status(201).json(resultCategory);
    }
}