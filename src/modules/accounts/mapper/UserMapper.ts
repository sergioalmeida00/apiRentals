import { IUserDTO } from "../dtos/IUserDTO";
import { User } from "../infra/entities/User";
import {instanceToInstance} from 'class-transformer'

export class UserMapper{
    static toDTO({
        email,
        avatar,
        driver_license,
        name,
        id,
        avatar_url
    }:User):IUserDTO {
        const user = instanceToInstance({
            email,
            avatar,
            driver_license,
            name,
            id,
            avatar_url
        })
        return user
    }
}