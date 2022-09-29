import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "@modules/accounts/infra/reposiroties/UserRepository";
import { AppError } from "@shared/erros/AppError";
import { auth } from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/reposiroties/UsersTokensRepository";

interface IPlayload{
    sub:string
}
export async function esureAuthenticated(request:Request, response:Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing!!");
    }

    const[, token] = authHeader.split(" ");

    try {
        const {sub: user_id} = verify(
            token, 
            auth.secret_token
            ) as IPlayload ;

        // const userRepository = new UserRepository();
    

        //PASSANDO O ID DO USER PARA QUE POSSA SER UTILIZADO NO CONTROLLER, PARA ISSO É PRECISO SOBRESCREVER A TIPAGEM DA BIBLIOTECA UTILIZADA, NESTE CASO O EXPRESS
        request.user = {
            id:user_id
        }

        next();
        
    } catch (error) {
        throw new AppError("Invalid Token!!")
    }

}