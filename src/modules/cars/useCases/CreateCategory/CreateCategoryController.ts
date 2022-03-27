import {Request,Response} from 'express'
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController{
    
    private createCategoryUseCase:CreateCategoryUseCase;

    constructor(createCategoryUseCase:CreateCategoryUseCase){
        this.createCategoryUseCase = createCategoryUseCase;
    }

    handle(request:Request, response:Response){
        const {name, description} = request.body;
        const resultCategory = this.createCategoryUseCase.execute({name,description});  

        return response.status(201).json({resultCategory});
    }
}