"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesAutenticationUser = void 0;
const express_1 = require("express");
const AutenticationUserUseController_1 = require("@modules/accounts/useCases/autenticationUser/AutenticationUserUseController");
const RefreshTokenController_1 = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");
const routesAutenticationUser = (0, express_1.Router)();
exports.routesAutenticationUser = routesAutenticationUser;
const autenticationUserController = new AutenticationUserUseController_1.AutenticationuserController();
const refreshTokenController = new RefreshTokenController_1.RefreshTokenController();
routesAutenticationUser.post('/sessions', autenticationUserController.handle);
routesAutenticationUser.post('/refresh-token', refreshTokenController.handle);