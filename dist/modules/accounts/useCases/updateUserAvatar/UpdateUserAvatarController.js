"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;
var _tsyringe = require("tsyringe");
var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");
class UpdateUserAvatarController {
  async handle(request, response) {
    //ID PASSADO PELO MIDDLEWARES AUTHENTICATION
    const {
      id
    } = request.user;
    const avatarFile = request.file.filename;
    const updateUserAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatarFile
    });
    return response.status(204).send();
  }
}
exports.UpdateUserAvatarController = UpdateUserAvatarController;