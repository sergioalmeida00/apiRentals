import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserToken";
import { UserToken } from "@modules/accounts/infra/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository{

    usersTokens:UserToken [] = []

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDto): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken,{
            user_id,
            expires_date,
            refresh_token
        });
         this.usersTokens.push(userToken);

         return userToken;
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(user => user.user_id === user_id && user.refresh_token === refresh_token);

        return userToken;
    }
    async deleteById(user_id: string): Promise<void> {
        const userToken = this.usersTokens.find(user => user.user_id === user_id);

        this.usersTokens.slice(this.usersTokens.indexOf(userToken));
    }
    async findByToken(token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(user => user.refresh_token === token);

        return userToken;
    }
    deleteByUserId(user_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}