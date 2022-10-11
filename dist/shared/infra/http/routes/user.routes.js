"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesUser = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _CreateUserController = require("@modules/accounts/useCases/createUser/CreateUserController");
var _UpdateUserAvatarController = require("@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");
var _upload = _interopRequireDefault(require("@config/upload"));
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
var _ProfileUserController = require("@modules/accounts/useCases/profileUser/ProfileUserController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routesUser = (0, _express.Router)();
exports.routesUser = routesUser;
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarUseCase = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
const uploadAvatar = (0, _multer.default)(_upload.default);
routesUser.post('/', createUserController.handle);
routesUser.patch('/avatar', _ensureAuthenticated.esureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarUseCase.handle);
routesUser.get('/profile-user', _ensureAuthenticated.esureAuthenticated, profileUserController.handle);