"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailUseCase = void 0;
var _IUserRepository = require("@modules/accounts/repositories/IUserRepository");
var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _IMailProvider = require("@shared/container/providers/MailProvider/IMailProvider");
var _AppError = require("@shared/erros/AppError");
var _tsyringe = require("tsyringe");
var _uuid = require("uuid");
var _path = _interopRequireDefault(require("path"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IMailProvider.IMailProvider === "undefined" ? Object : _IMailProvider.IMailProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordMailUseCase {
  constructor(userRepository, usersTokensRepository, dayJsDateProvider, mailProvider) {
    this.userRepository = userRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dayJsDateProvider = dayJsDateProvider;
    this.mailProvider = mailProvider;
  }
  async execute(email) {
    const user = await this.userRepository.findByEmail(email);
    const templatePath = _path.default.resolve(__dirname, '..', '..', 'views', 'Emails', 'forgotPassword.hbs');
    if (!user) {
      throw new _AppError.AppError("Email is not exists!", 404);
    }
    const token = (0, _uuid.v4)();
    const expires_date = this.dayJsDateProvider.addHours(3);
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });
    const variables = {
      name: user.name,
      email: user.email,
      link: `http://localhost:3333/password/reset?token=${token}`
    };
    await this.mailProvider.sendMail(email, "Recupeção de Senha", variables, templatePath);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;