"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutenticationuserController = void 0;
var _tsyringe = require("tsyringe");
var _AutenticationUserUseCase = require("./AutenticationUserUseCase");
class AutenticationuserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;
    const authenticationUserUseCase = _tsyringe.container.resolve(_AutenticationUserUseCase.AutenticationUserUseCase);
    const token = await authenticationUserUseCase.execute({
      email,
      password
    });
    return response.status(201).json(token);
  }
}
exports.AutenticationuserController = AutenticationuserController;