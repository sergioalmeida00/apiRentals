"use strict";

var _AppError = require("@shared/erros/AppError");
var _UserRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");
var _CreateUserUseCase = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
var _AutenticationUserUseCase = require("./AutenticationUserUseCase");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
let usersReposytoryInMemory;
let autenticationUserUseCase;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dayjsDateProvider;
describe("Authentication User", () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersReposytoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    autenticationUserUseCase = new _AutenticationUserUseCase.AutenticationUserUseCase(usersReposytoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersReposytoryInMemory);
  });
  it("Should be able to authentication an user", async () => {
    const user = {
      driver_license: "00330022",
      email: "user@test.com.br",
      name: "Sérgio Almeida",
      password: "1234"
    };
    await createUserUseCase.execute(user);
    const resultToken = await autenticationUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(resultToken).toHaveProperty("token");
  });
  it("Should not be able to authenticate an nonexistent user", async () => {
    await expect(async () => {
      await autenticationUserUseCase.execute({
        email: "false@teste.com.br",
        password: "12345"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it("Should not be able to authenticate an incorret password", async () => {
    await expect(async () => {
      const user = {
        driver_license: "00330022",
        email: "user@test.com.br",
        name: "Sérgio Almeida",
        password: "1234"
      };
      await createUserUseCase.execute(user);
      const result = await autenticationUserUseCase.execute({
        email: user.email,
        password: "adfdsf"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});