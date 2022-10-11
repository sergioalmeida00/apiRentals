"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepositoryInMemory = void 0;
var _User = require("@modules/accounts/infra/entities/User");
class UserRepositoryInMemory {
  constructor() {
    this.users = [];
  }
  async create({
    driver_license,
    email,
    name,
    password
  }) {
    const user = new _User.User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password
    });
    this.users.push(user);
    return user;
  }
  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }
  async findById(id) {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}
exports.UserRepositoryInMemory = UserRepositoryInMemory;