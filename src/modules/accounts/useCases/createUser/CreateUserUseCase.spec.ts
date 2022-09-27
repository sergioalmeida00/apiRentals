import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";


let userRepositoryInMemory:UserRepositoryInMemory;
let createUserUseCase:CreateUserUseCase;
describe("Create User" ,() => {
    beforeAll(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able an create user", async ()=>{
        const user = await createUserUseCase.execute({
            name:"Adele Hanson",
            password:"12345",
            email:"cumero@tekakcu.sd",
            driver_license:"3706013382",
        });

        expect(user).toHaveProperty("id");
    });

    it("should not be able car email exists", async() => {
        await expect(async ()=>{
            await createUserUseCase.execute({
                name:"Adele Hanson",
                password:"12345",
                email:"cumero@tekakcu.sd",
                driver_license:"3706013382",
            });
            await createUserUseCase.execute({
                name:"Adele Hanson",
                password:"12345",
                email:"cumero@tekakcu.sd",
                driver_license:"3706013382",
            })
        }).rejects.toBeInstanceOf(AppError)
    })

})