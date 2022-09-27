import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import {jest} from "@jest/globals";
import { AppError } from "@shared/erros/AppError";

let userRepositoryInMemory:UserRepositoryInMemory;
let usersTokensRepositoryInMemory:UsersTokensRepositoryInMemory;
let dayjsDateProvider:DayjsDateProvider;
let mailProvider:MailProviderInMemory;
let sendForgotPasswordMailUseCase:SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {

    beforeEach(() =>{
        userRepositoryInMemory = new UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider,"sendMail");
        await userRepositoryInMemory.create({
            driver_license:"3871887831",
            email:"denwidi@fep.tk",
            name:"Aiden Alvarez",
            password:"123456"
        });
        await sendForgotPasswordMailUseCase.execute("denwidi@fep.tk")
        expect(sendMail).toHaveBeenCalled();

    });

    it("should not be able to send an email if user does not exists", async () =>{
        await expect(
            sendForgotPasswordMailUseCase.execute("vertardic@lavtoc.mu")
        ).rejects.toBeInstanceOf(AppError)
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory,'create');

        await userRepositoryInMemory.create({
            driver_license:"3952748837",
            email:"tofsavid@jo.tl",
            name:"Christina Miles",
            password:"147258"
        });

        await sendForgotPasswordMailUseCase.execute('tofsavid@jo.tl');

        expect(generateTokenMail).toHaveBeenCalled();
    })
});