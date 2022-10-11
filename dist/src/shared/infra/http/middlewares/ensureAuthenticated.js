"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("@shared/erros/AppError");
const auth_1 = require("@config/auth");
function esureAuthenticated(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.AppError("Token missing!!");
        }
        const [, token] = authHeader.split(" ");
        try {
            const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.auth.secret_token);
            // const userRepository = new UserRepository();
            //PASSANDO O ID DO USER PARA QUE POSSA SER UTILIZADO NO CONTROLLER, PARA ISSO É PRECISO SOBRESCREVER A TIPAGEM DA BIBLIOTECA UTILIZADA, NESTE CASO O EXPRESS
            request.user = {
                id: user_id
            };
            next();
        }
        catch (error) {
            throw new AppError_1.AppError("Invalid Token!!");
        }
    });
}
exports.esureAuthenticated = esureAuthenticated;
