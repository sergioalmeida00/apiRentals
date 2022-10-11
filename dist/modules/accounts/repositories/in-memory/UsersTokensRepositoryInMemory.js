"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;
var _UserTokens = require("@modules/accounts/infra/entities/UserTokens");
class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }
  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UserTokens.UserToken();
    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token
    });
    this.usersTokens.push(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(user => user.user_id === user_id && user.refresh_token === refresh_token);
    return userToken;
  }
  async deleteById(user_id) {
    const userToken = this.usersTokens.find(user => user.user_id === user_id);
    this.usersTokens.slice(this.usersTokens.indexOf(userToken));
  }
  async findByToken(token) {
    const userToken = this.usersTokens.find(user => user.refresh_token === token);
    return userToken;
  }
  deleteByUserId(user_id) {
    throw new Error("Method not implemented.");
  }
}
exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;