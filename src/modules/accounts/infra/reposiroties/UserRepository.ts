import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/entities/User";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

export class UserRepository implements IUserRepository{
    private repository:Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

     async create({name,password,email,driver_license,id, avatar}: ICreateUserDto): Promise<User> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            id,
            avatar,
        });
        await this.repository.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where:{email}
        });

        return user;
    }

    async findById(id:string):Promise<User>{
        const user = await this.repository.findOne(id);

        return user;
    }
}