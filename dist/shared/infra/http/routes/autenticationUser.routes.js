"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesAutenticationUser = void 0;
var _express = require("express");
var _AutenticationUserUseController = require("@modules/accounts/useCases/autenticationUser/AutenticationUserUseController");
var _RefreshTokenController = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");
const routesAutenticationUser = (0, _express.Router)();
exports.routesAutenticationUser = routesAutenticationUser;
const autenticationUserController = new _AutenticationUserUseController.AutenticationuserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
routesAutenticationUser.post('/sessions', autenticationUserController.handle);
routesAutenticationUser.post('/refresh-token', refreshTokenController.handle);