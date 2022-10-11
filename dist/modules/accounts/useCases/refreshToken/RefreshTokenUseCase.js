"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;
var _auth = require("@config/auth");
var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("@shared/erros/AppError");
var _jsonwebtoken = require("jsonwebtoken");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, dateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }
  async execute(token) {
    const {
      email,
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.auth.secret_refresh_token);

    // const user_id = sub;

    const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
    if (!userTokens) {
      throw new _AppError.AppError("Refresh token does not exists!");
    }
    await this.usersTokensRepository.deleteById(userTokens.user_id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: _auth.auth.expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(_auth.auth.expires_refresh_token_days);
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.auth.secret_token, {
      subject: user_id,
      expiresIn: _auth.auth.expires_in_token
    });
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user_id
    });
    return {
      refresh_token,
      newToken
    };
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;