import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserToken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserTokens";


export class UsersTokensRepository implements IUsersTokensRepository{

    private repository:Repository<UserToken>;
    constructor(){
        this.repository = getRepository(UserToken);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDto): Promise<UserToken> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token:string): Promise<UserToken> {
        const userTokens = await this.repository.findOne({
            user_id, refresh_token
        });
        return userTokens;
    }

    async deleteById(user_id: string): Promise<void> {
        await this.repository.delete({user_id});
    }

}