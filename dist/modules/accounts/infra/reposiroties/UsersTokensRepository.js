"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;
var _typeorm = require("typeorm");
var _UserTokens = require("../entities/UserTokens");
class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserTokens.UserToken);
  }
  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userTokens = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return userTokens;
  }
  async deleteById(user_id) {
    await this.repository.delete({
      user_id
    });
  }
  async findByToken(token) {
    const user = await this.repository.findOne({
      where: {
        refresh_token: token
      }
    });
    return user;
  }
  async deleteByUserId(user_id) {
    await this.repository.delete({
      user_id
    });
  }
}
exports.UsersTokensRepository = UsersTokensRepository;