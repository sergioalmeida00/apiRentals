import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/erros/AppError";


interface IRequest{
    email:string;
    password:string;
}

interface IResponse{
    user:{
        name:string;
        email:string;
    },
    token:string;
}

@injectable()
export class AutenticationUserUseCase{
    constructor(
        @inject("UserRepository") 
        private userRepository:IUserRepository
    ){}
    async execute({email,password}:IRequest): Promise<IResponse>{

        //verifica se o usuario existe
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or Password incorret!", 401);
        }        
        
        //verifica de a senha/email estão corretos
        const passwordMach = await compare(password, user.password);

        if(!passwordMach){
            throw new AppError("Email or Password incorret!",401); 
        }

        //gerar json JWT token
        const token = sign({},"e86f48c730c6197cf87e348eb8c33a38",{
            subject:user.id,
            expiresIn:"1d"
        });

        const tokenReturn:IResponse ={
            token,
            user:{
                name:user.name,
                email:user.email
            }
        }

        return tokenReturn
    }

}