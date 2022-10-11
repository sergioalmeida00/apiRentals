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
exports.SESMailProvider = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const promises_1 = require("fs/promises");
const handlebars_1 = __importDefault(require("handlebars"));
class SESMailProvider {
    constructor() {
        this.account();
    }
    account() {
        return __awaiter(this, void 0, void 0, function* () {
            mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
        });
    }
    sendMail(to, subject, variables, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateMail = yield (0, promises_1.readFile)(path, 'utf-8');
            const templateParse = handlebars_1.default.compile(templateMail);
            const templateHTML = templateParse(variables);
            try {
                const result = yield mail_1.default.send({
                    to: String(to),
                    from: "Rentx <sergioalmeidaa00@gmail.com>",
                    subject,
                    html: templateHTML
                });
                console.log(`Email sent: ${result}`);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.SESMailProvider = SESMailProvider;
