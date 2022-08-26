import { ICreateUserTokenDto } from "../dtos/ICreateUserToken";
import { UserToken } from "../infra/entities/UserTokens";

interface IUsersTokensRepository{
    create({expires_date,refresh_token,user_id}:ICreateUserTokenDto):Promise<UserToken>;
}

export {IUsersTokensRepository}