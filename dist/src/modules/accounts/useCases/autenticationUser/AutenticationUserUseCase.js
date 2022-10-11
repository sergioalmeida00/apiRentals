"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AutenticationUserUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("@shared/erros/AppError");
const auth_1 = require("@config/auth");
let AutenticationUserUseCase = class AutenticationUserUseCase {
    constructor(userRepository, usersTokensRepository, dateProvider) {
        this.userRepository = userRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { secret_token, expires_in_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth_1.auth;
            //verifica se o usuario existe
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new AppError_1.AppError("Email or Password incorret!", 401);
            }
            //verifica de a senha/email estão corretos
            const passwordMach = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMach) {
                throw new AppError_1.AppError("Email or Password incorret!", 401);
            }
            //gerar json JWT token
            const token = (0, jsonwebtoken_1.sign)({}, secret_token, {
                subject: user.id,
                expiresIn: expires_in_token
            });
            //refreshToken 
            const refresh_token = (0, jsonwebtoken_1.sign)({ email }, secret_refresh_token, {
                subject: user.id,
                expiresIn: expires_in_refresh_token
            });
            const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
            yield this.usersTokensRepository.create({
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
        });
    }
};
AutenticationUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)("DayjsDateProvider")),
    __metadata("design:paramtypes", [Object, Object, Object])
], AutenticationUserUseCase);
exports.AutenticationUserUseCase = AutenticationUserUseCase;
