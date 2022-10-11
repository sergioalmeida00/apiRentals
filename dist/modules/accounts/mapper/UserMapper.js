"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMapper = void 0;
var _classTransformer = require("class-transformer");
class UserMapper {
  static toDTO({
    email,
    avatar,
    driver_license,
    name,
    id,
    avatar_url
  }) {
    const user = (0, _classTransformer.instanceToInstance)({
      email,
      avatar,
      driver_license,
      name,
      id,
      avatar_url
    });
    return user;
  }
}
exports.UserMapper = UserMapper;