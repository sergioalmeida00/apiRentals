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
const AppError_1 = require("@shared/erros/AppError");
const UserRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const AutenticationUserUseCase_1 = require("./AutenticationUserUseCase");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
let usersReposytoryInMemory;
let autenticationUserUseCase;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dayjsDateProvider;
describe("Authentication User", () => {
    beforeEach(() => {
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        usersReposytoryInMemory = new UserRepositoryInMemory_1.UserRepositoryInMemory();
        autenticationUserUseCase = new AutenticationUserUseCase_1.AutenticationUserUseCase(usersReposytoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersReposytoryInMemory);
    });
    it("Should be able to authentication an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "00330022",
            email: "user@test.com.br",
            name: "Sérgio Almeida",
            password: "1234"
        };
        yield createUserUseCase.execute(user);
        const resultToken = yield autenticationUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(resultToken).toHaveProperty("token");
    }));
    it("Should not be able to authenticate an nonexistent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield autenticationUserUseCase.execute({
                email: "false@teste.com.br",
                password: "12345"
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
    it("Should not be able to authenticate an incorret password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                driver_license: "00330022",
                email: "user@test.com.br",
                name: "Sérgio Almeida",
                password: "1234"
            };
            yield createUserUseCase.execute(user);
            const result = yield autenticationUserUseCase.execute({
                email: user.email,
                password: "adfdsf"
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
