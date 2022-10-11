"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;
var _mail = _interopRequireDefault(require("@sendgrid/mail"));
var _promises = require("fs/promises");
var _handlebars = _interopRequireDefault(require("handlebars"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SESMailProvider {
  constructor() {
    this.account();
  }
  async account() {
    _mail.default.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async sendMail(to, subject, variables, path) {
    const templateMail = await (0, _promises.readFile)(path, 'utf-8');
    const templateParse = _handlebars.default.compile(templateMail);
    const templateHTML = templateParse(variables);
    try {
      const result = await _mail.default.send({
        to: String(to),
        from: "Rentx <sergioalmeidaa00@gmail.com>",
        subject,
        html: templateHTML
      });
      console.log(`Email sent: ${result}`);
    } catch (error) {
      console.log(error);
    }
  }
}
exports.SESMailProvider = SESMailProvider;