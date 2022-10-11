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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherealMailProvider = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const AppError_1 = require("@shared/erros/AppError");
const handlebars_1 = __importDefault(require("handlebars"));
const promises_1 = require("fs/promises");
class EtherealMailProvider {
    constructor() {
        this.createAccount();
    }
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield nodemailer_1.default.createTestAccount();
                const transporter = nodemailer_1.default.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });
                this.client = transporter;
            }
            catch (error) {
                throw new AppError_1.AppError(`${error}`);
            }
        });
    }
    sendMail(to, subject, variables, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateMail = yield (0, promises_1.readFile)(path, 'utf-8');
            const templateParse = handlebars_1.default.compile(templateMail);
            const templateHTML = templateParse(variables);
            const message = yield this.client.sendMail({
                to,
                from: "Rentx <noreplay@rentex.com.br>",
                subject,
                html: templateHTML
            });
            console.log('Message sent: %s', message.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(message));
        });
    }
}
exports.EtherealMailProvider = EtherealMailProvider;
