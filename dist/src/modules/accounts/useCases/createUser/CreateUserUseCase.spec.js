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
const AppError_1 = require("@shared/erros/AppError");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
let userRepositoryInMemory;
let createUserUseCase;
describe("Create User", () => {
    beforeAll(() => {
        userRepositoryInMemory = new UserRepositoryInMemory_1.UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepositoryInMemory);
    });
    it("should be able an create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUserUseCase.execute({
            name: "Adele Hanson",
            password: "12345",
            email: "cumero@tekakcu.sd",
            driver_license: "3706013382",
        });
        expect(user).toHaveProperty("id");
    }));
    it("should not be able car email exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createUserUseCase.execute({
                name: "Adele Hanson",
                password: "12345",
                email: "cumero@tekakcu.sd",
                driver_license: "3706013382",
            });
            yield createUserUseCase.execute({
                name: "Adele Hanson",
                password: "12345",
                email: "cumero@tekakcu.sd",
                driver_license: "3706013382",
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
