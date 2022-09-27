import { ICreateUserDto } from "../dtos/ICreateUserDTO";
import { User } from "../infra/entities/User";

interface IUserRepository{
    create(data:ICreateUserDto): Promise<User>;
    findByEmail(email:string): Promise<User>;
    findById(id:string):Promise<User>
}

export{IUserRepository}