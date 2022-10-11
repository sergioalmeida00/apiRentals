"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _AppError = require("@shared/erros/AppError");
var _handlebars = _interopRequireDefault(require("handlebars"));
var _promises = require("fs/promises");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class EtherealMailProvider {
  constructor() {
    this.client = void 0;
    this.createAccount();
  }
  async createAccount() {
    try {
      const account = await _nodemailer.default.createTestAccount();
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter;
    } catch (error) {
      throw new _AppError.AppError(`${error}`);
    }
  }
  async sendMail(to, subject, variables, path) {
    const templateMail = await (0, _promises.readFile)(path, 'utf-8');
    const templateParse = _handlebars.default.compile(templateMail);
    const templateHTML = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentex.com.br>",
      subject,
      html: templateHTML
    });
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(message));
  }
}
exports.EtherealMailProvider = EtherealMailProvider;