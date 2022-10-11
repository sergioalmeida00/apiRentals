"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;
var _typeorm = require("typeorm");
var _User = require("@modules/accounts/infra/entities/User");
class UserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }
  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar
  }) {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar
    });
    await this.repository.save(user);
    return user;
  }
  async findByEmail(email) {
    const user = await this.repository.findOne({
      where: {
        email
      }
    });
    return user;
  }
  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }
}
exports.UserRepository = UserRepository;