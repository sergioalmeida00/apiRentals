import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/erros/AppError";
import { User } from "@modules/accounts/infra/entities/User";

@injectable()
export class CreateUserUseCase{

    constructor(@inject("UserRepository") private userRepository: IUserRepository){}

    async execute({name,password,email,driver_license}:ICreateUserDto): Promise<User>{
        
        const passwordHash = await hash(password,8);

        const userAlreadyExists = await this.userRepository.findByEmail(email);      

        if(userAlreadyExists){
            throw new AppError("Email user already exists!!");
        }
        const user = await this.userRepository.create({
            name,
            password:passwordHash,
            email,
            driver_license
        });

        return user                
    }
}