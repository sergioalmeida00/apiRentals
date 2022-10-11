"use strict";

var _UserRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");
var _AppError = require("@shared/erros/AppError");
var _CreateUserUseCase = require("./CreateUserUseCase");
let userRepositoryInMemory;
let createUserUseCase;
describe("Create User", () => {
  beforeAll(() => {
    userRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able an create user", async () => {
    const user = await createUserUseCase.execute({
      name: "Adele Hanson",
      password: "12345",
      email: "cumero@tekakcu.sd",
      driver_license: "3706013382"
    });
    expect(user).toHaveProperty("id");
  });
  it("should not be able car email exists", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: "Adele Hanson",
        password: "12345",
        email: "cumero@tekakcu.sd",
        driver_license: "3706013382"
      });
      await createUserUseCase.execute({
        name: "Adele Hanson",
        password: "12345",
        email: "cumero@tekakcu.sd",
        driver_license: "3706013382"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});