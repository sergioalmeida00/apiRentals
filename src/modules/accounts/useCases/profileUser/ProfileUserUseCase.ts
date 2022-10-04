import { IUserDTO } from "@modules/accounts/dtos/IUserDTO";
import { UserMapper } from "@modules/accounts/mapper/UserMapper";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUserRepository
    ){}

    async execute(id: string ):Promise<IUserDTO> {
        const user = await this.userRepository.findById(id);

        if(!user){
            throw new AppError("User is not exists!");
        }

        return UserMapper.toDTO(user);
    }
}