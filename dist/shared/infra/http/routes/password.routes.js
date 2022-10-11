"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerPassword = void 0;
var _ResetPasswordUserController = require("@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");
var _SendForgotPasswordMailController = require("@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");
var _express = require("express");
const routerPassword = (0, _express.Router)();
exports.routerPassword = routerPassword;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordUserController = new _ResetPasswordUserController.ResetPasswordUserController();
routerPassword.post('/forgot', sendForgotPasswordMailController.handle);
routerPassword.post('/reset', resetPasswordUserController.handle);