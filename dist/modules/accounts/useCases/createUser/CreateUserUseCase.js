"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _bcrypt = require("bcrypt");
var _IUserRepository = require("@modules/accounts/repositories/IUserRepository");
var _AppError = require("@shared/erros/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    name,
    password,
    email,
    driver_license
  }) {
    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new _AppError.AppError("Email user already exists!!");
    }
    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });
    return user;
  }
}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;