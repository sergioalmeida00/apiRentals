import { ICreateUserTokenDto } from "../dtos/ICreateUserToken";
import { UserToken } from "../infra/entities/UserTokens";

interface IUsersTokensRepository{
    create({expires_date,refresh_token,user_id}:ICreateUserTokenDto):Promise<UserToken>;
    findByUserIdAndRefreshToken(user_id:string, refresh_token:string):Promise<UserToken>;
    deleteById(user_id:string):Promise<void>;
}

export {IUsersTokensRepository}