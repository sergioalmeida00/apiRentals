"use strict";

var _UserRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");
var _globals = require("@jest/globals");
var _AppError = require("@shared/erros/AppError");
let userRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dayjsDateProvider;
let mailProvider;
let sendForgotPasswordMailUseCase;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = _globals.jest.spyOn(mailProvider, "sendMail");
    await userRepositoryInMemory.create({
      driver_license: "3871887831",
      email: "denwidi@fep.tk",
      name: "Aiden Alvarez",
      password: "123456"
    });
    await sendForgotPasswordMailUseCase.execute("denwidi@fep.tk");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("vertardic@lavtoc.mu")).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = _globals.jest.spyOn(usersTokensRepositoryInMemory, 'create');
    await userRepositoryInMemory.create({
      driver_license: "3952748837",
      email: "tofsavid@jo.tl",
      name: "Christina Miles",
      password: "147258"
    });
    await sendForgotPasswordMailUseCase.execute('tofsavid@jo.tl');
    expect(generateTokenMail).toHaveBeenCalled();
  });
});