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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordMailUseCase = void 0;
const AppError_1 = require("@shared/erros/AppError");
const tsyringe_1 = require("tsyringe");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
let SendForgotPasswordMailUseCase = class SendForgotPasswordMailUseCase {
    constructor(userRepository, usersTokensRepository, dayJsDateProvider, mailProvider) {
        this.userRepository = userRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dayJsDateProvider = dayJsDateProvider;
        this.mailProvider = mailProvider;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            const templatePath = path_1.default.resolve(__dirname, '..', '..', 'views', 'Emails', 'forgotPassword.hbs');
            if (!user) {
                throw new AppError_1.AppError("Email is not exists!", 404);
            }
            const token = (0, uuid_1.v4)();
            const expires_date = this.dayJsDateProvider.addHours(3);
            yield this.usersTokensRepository.create({
                refresh_token: token,
                user_id: user.id,
                expires_date
            });
            const variables = {
                name: user.name,
                email: user.email,
                link: `http://localhost:3333/password/reset?token=${token}`
            };
            yield this.mailProvider.sendMail(email, "Recupeção de Senha", variables, templatePath);
        });
    }
};
SendForgotPasswordMailUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(3, (0, tsyringe_1.inject)('MailProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SendForgotPasswordMailUseCase);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;
