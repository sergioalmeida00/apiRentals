import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "@modules/accounts/infra/reposiroties/UserRepository";
import { AppError } from "@shared/erros/AppError";

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
        const {sub: user_id} = verify(token, "e86f48c730c6197cf87e348eb8c33a38") as IPlayload ;
        const userRepository = new UserRepository();

        const userAlReadyExist = await userRepository.findById(user_id);

        if(!userAlReadyExist){
            throw new AppError("User does not exists!")
        }

        //PASSANDO O ID DO USER PARA QUE POSSA SER UTILIZADO NO CONTROLLER, PARA ISSO É PRECISO SOBRESCREVER A TIPAGEM DA BIBLIOTECA UTILIZADA, NESTE CASO O EXPRESS
        request.user = {
            id:user_id
        }

        next();
        
    } catch (error) {
        throw new AppError("Invalid Token!!")
    }

}