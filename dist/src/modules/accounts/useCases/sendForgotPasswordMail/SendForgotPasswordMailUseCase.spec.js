"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
const globals_1 = require("@jest/globals");
const AppError_1 = require("@shared/erros/AppError");
let userRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dayjsDateProvider;
let mailProvider;
let sendForgotPasswordMailUseCase;
describe("Send Forgot Mail", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory_1.UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider, mailProvider);
    });
    it("should be able to send a forgot password mail to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = globals_1.jest.spyOn(mailProvider, "sendMail");
        yield userRepositoryInMemory.create({
            driver_license: "3871887831",
            email: "denwidi@fep.tk",
            name: "Aiden Alvarez",
            password: "123456"
        });
        yield sendForgotPasswordMailUseCase.execute("denwidi@fep.tk");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("should not be able to send an email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("vertardic@lavtoc.mu")).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
    it("should be able to create an users token", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = globals_1.jest.spyOn(usersTokensRepositoryInMemory, 'create');
        yield userRepositoryInMemory.create({
            driver_license: "3952748837",
            email: "tofsavid@jo.tl",
            name: "Christina Miles",
            password: "147258"
        });
        yield sendForgotPasswordMailUseCase.execute('tofsavid@jo.tl');
        expect(generateTokenMail).toHaveBeenCalled();
    }));
});
