import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

interface IRequest{
    token:string,
    password:string
}

@injectable()
export class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private userTokenRepository:IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider:IDateProvider,
        @inject("UserRepository")
        private userRepository:IUserRepository
    ){}
    async execute({token, password}:IRequest):Promise<void>{
        const userToken = await this.userTokenRepository.findByToken(token); 

        if(!userToken){
            throw new AppError("Token invalid!", 401);            
        }

        if(this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow())){
            throw new AppError("Token expired!");            
        }

        const user = await this.userRepository.findById(userToken.user_id);
      
        user.password = await hash(password,8);

        await this.userRepository.create(user);

        await this.userTokenRepository.deleteById(userToken.user_id);
    }
}