import { auth } from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/erros/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload{
    sub:string;
    email:string
}
interface IResponseToken{
    newToken:string;
    refresh_token:string
}

@injectable()
export class RefreshTokenUseCase{

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider

    ){}

    async execute(token:string):Promise<IResponseToken>{
        const {email,sub:user_id} = verify(token, auth.secret_refresh_token) as IPayload;

        // const user_id = sub;

        const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userTokens){
            throw new AppError("Refresh token does not exists!");            
        }

        await this.usersTokensRepository.deleteById(userTokens.user_id);
        
        const refresh_token = sign({email},auth.secret_refresh_token, {
            subject:user_id,
            expiresIn:auth.expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

        const newToken = sign({}, auth.secret_token,{
            subject:user_id,
            expiresIn:auth.expires_in_token
        });

        await this.usersTokensRepository.create({
            expires_date:refresh_token_expires_date,
            refresh_token,
            user_id:user_id
        });
        
        return {refresh_token,newToken};
    }
}