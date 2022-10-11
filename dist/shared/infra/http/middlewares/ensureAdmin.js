"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;
var _UserRepository = require("@modules/accounts/infra/reposiroties/UserRepository");
var _AppError = require("@shared/erros/AppError");
async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const userRepository = new _UserRepository.UserRepository();
  const user = await userRepository.findById(id);
  if (!user.isAdmin) {
    throw new _AppError.AppError("User is not Admin!");
  }
  next();
}