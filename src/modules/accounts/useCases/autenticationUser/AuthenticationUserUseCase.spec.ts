import { AppError } from "@shared/erros/AppError";
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AutenticationUserUseCase } from "./AutenticationUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let usersReposytoryInMemory: UserRepositoryInMemory;
let autenticationUserUseCase: AutenticationUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider:DayjsDateProvider;

describe("Authentication User",()=>{

    beforeEach(()=>{
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        usersReposytoryInMemory = new UserRepositoryInMemory();
        autenticationUserUseCase = new AutenticationUserUseCase(
            usersReposytoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider
            );
        createUserUseCase = new CreateUserUseCase(usersReposytoryInMemory);
    });

    it("Should be able to authentication an user", async ()=>{
        const user:ICreateUserDto={
            driver_license:"00330022",
            email:"user@test.com.br",
            name:"Sérgio Almeida",
            password:"1234"
        }

        await createUserUseCase.execute(user);

        const resultToken = await autenticationUserUseCase.execute({
            email:user.email,
            password:user.password
        });

        
        expect(resultToken).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user",async ()=>{

       await expect(async()=>{
         await autenticationUserUseCase.execute({
                email:"false@teste.com.br",
                password:"12345"
            });
            
        }).rejects.toBeInstanceOf(AppError);
    });


    it("Should not be able to authenticate an incorret password", async ()=>{

        await expect(async()=>{
            const user:ICreateUserDto ={
                driver_license:"00330022",
                email:"user@test.com.br",
                name:"Sérgio Almeida",
                password:"1234"
            }
            await createUserUseCase.execute(user);

            const result = await autenticationUserUseCase.execute({
                email:user.email,
                password:"adfdsf"
            });

        }).rejects.toBeInstanceOf(AppError);
    });
})