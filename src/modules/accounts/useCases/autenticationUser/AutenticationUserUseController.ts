import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticationUserUseCase } from "./AutenticationUserUseCase";

export class AutenticationuserController{

    async handle(request:Request, response:Response): Promise<Response>{
        const{email,password} = request.body;
        const authenticationUserUseCase = container.resolve(AutenticationUserUseCase);

        const token = await authenticationUserUseCase.execute({email,password});

        return response.status(201).json(token)
    }
}