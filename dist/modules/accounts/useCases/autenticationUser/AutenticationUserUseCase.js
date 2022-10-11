"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutenticationUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUserRepository = require("@modules/accounts/repositories/IUserRepository");
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _AppError = require("@shared/erros/AppError");
var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");
var _auth = require("@config/auth");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let AutenticationUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AutenticationUserUseCase {
  constructor(userRepository, usersTokensRepository, dateProvider) {
    this.userRepository = userRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }
  async execute({
    email,
    password
  }) {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = _auth.auth;

    //verifica se o usuario existe
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.AppError("Email or Password incorret!", 401);
    }

    //verifica de a senha/email estão corretos
    const passwordMach = await (0, _bcrypt.compare)(password, user.password);
    if (!passwordMach) {
      throw new _AppError.AppError("Email or Password incorret!", 401);
    }

    //gerar json JWT token
    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });

    //refreshToken 
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id
    });
    const tokenReturn = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    };
    return tokenReturn;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AutenticationUserUseCase = AutenticationUserUseCase;