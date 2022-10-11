"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserUseCase = void 0;
var _UserMapper = require("@modules/accounts/mapper/UserMapper");
var _IUserRepository = require("@modules/accounts/repositories/IUserRepository");
var _AppError = require("@shared/erros/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let ProfileUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ProfileUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new _AppError.AppError("User is not exists!");
    }
    return _UserMapper.UserMapper.toDTO(user);
  }
}) || _class) || _class) || _class) || _class);
exports.ProfileUserUseCase = ProfileUserUseCase;