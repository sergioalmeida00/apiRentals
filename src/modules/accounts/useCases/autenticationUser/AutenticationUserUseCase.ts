import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/erros/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { auth } from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


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
    refresh_token:string;
}

@injectable()
export class AutenticationUserUseCase{
    constructor(
        @inject("UserRepository") 
        private userRepository:IUserRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository:IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider
    ){}
    async execute({email,password}:IRequest): Promise<IResponse>{
        const{secret_token, expires_in_token,secret_refresh_token,expires_in_refresh_token,expires_refresh_token_days} = auth;

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
        const token = sign({},secret_token,{
            subject:user.id,
            expiresIn:expires_in_token
        });

        //refreshToken 
        const refresh_token = sign({email},secret_refresh_token, {
            subject:user.id,
            expiresIn:expires_in_refresh_token
        });
        
        const refresh_token_expires_date =  this.dateProvider.addDays(expires_refresh_token_days);
        
        await this.usersTokensRepository.create({
            expires_date:refresh_token_expires_date,
            refresh_token,
            user_id:user.id
        });

        const tokenReturn:IResponse ={
            token,
            refresh_token,
            user:{
                name:user.name,
                email:user.email
            }
        }

        return tokenReturn
    }

}