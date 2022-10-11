"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esureAuthenticated = esureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _AppError = require("@shared/erros/AppError");
var _auth = require("@config/auth");
async function esureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.AppError("Token missing!!");
  }
  const [, token] = authHeader.split(" ");
  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.auth.secret_token);

    // const userRepository = new UserRepository();

    //PASSANDO O ID DO USER PARA QUE POSSA SER UTILIZADO NO CONTROLLER, PARA ISSO É PRECISO SOBRESCREVER A TIPAGEM DA BIBLIOTECA UTILIZADA, NESTE CASO O EXPRESS
    request.user = {
      id: user_id
    };
    next();
  } catch (error) {
    throw new _AppError.AppError("Invalid Token!!");
  }
}