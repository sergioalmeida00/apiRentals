import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


export class ListCategoriesController{
    private listCategorisUseCase:ListCategoriesUseCase;

    constructor(listCategorisUseCase:ListCategoriesUseCase){
        this.listCategorisUseCase = listCategorisUseCase;
    }

    handle(request:Request, response:Response){
        const listAll = this.listCategorisUseCase.execute();       

        return response.status(201).json({listAll});
    }
}