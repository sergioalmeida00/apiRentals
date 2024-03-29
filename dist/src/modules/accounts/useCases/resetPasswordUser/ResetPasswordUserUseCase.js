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
exports.ResetPasswordUserUseCase = void 0;
const AppError_1 = require("@shared/erros/AppError");
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = require("bcrypt");
let ResetPasswordUserUseCase = class ResetPasswordUserUseCase {
    constructor(userTokenRepository, dayjsDateProvider, userRepository) {
        this.userTokenRepository = userTokenRepository;
        this.dayjsDateProvider = dayjsDateProvider;
        this.userRepository = userRepository;
    }
    execute({ token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield this.userTokenRepository.findByToken(token);
            if (!userToken) {
                throw new AppError_1.AppError("Token invalid!", 401);
            }
            if (this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow())) {
                throw new AppError_1.AppError("Token expired!");
            }
            const user = yield this.userRepository.findById(userToken.user_id);
            user.password = yield (0, bcrypt_1.hash)(password, 8);
            yield this.userRepository.create(user);
            yield this.userTokenRepository.deleteById(userToken.user_id);
        });
    }
};
ResetPasswordUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersTokensRepository")),
    __param(1, (0, tsyringe_1.inject)("DayjsDateProvider")),
    __param(2, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], ResetPasswordUserUseCase);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;
