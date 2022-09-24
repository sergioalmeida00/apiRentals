import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from 'uuid';
import  path from 'path';

@injectable()
export class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository:IUserRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository:IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dayJsDateProvider:IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider:IMailProvider
    ){}

    async execute(email:string){
        const user = await this.userRepository.findByEmail(email);
        const templatePath = path.resolve(__dirname,'..','..','views','Emails','forgotPassword.hbs');

        if(!user){
            throw new AppError("Email is not exists!", 404);            
        }

        const token = uuidV4();
        const expires_date = this.dayJsDateProvider.addHours(3);
           
        await this.usersTokensRepository.create({
            refresh_token:token,
            user_id: user.id,
            expires_date
        });

        const variables = {
            name: user.name,
            email:user.email,
            link:`http://localhost:3333/password/reset?token=${token}`
        }

        await this.mailProvider.sendMail(email, "Recupeção de Senha", variables, templatePath);

    }
}