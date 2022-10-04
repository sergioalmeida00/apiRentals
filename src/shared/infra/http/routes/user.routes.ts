import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import upload from "@config/upload";
import { esureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const routesUser = Router();
const createUserController = new CreateUserController();
const updateUserAvatarUseCase = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();



const uploadAvatar = multer(upload);

routesUser.post('/', createUserController.handle);

routesUser.patch('/avatar',esureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarUseCase.handle);

routesUser.get('/profile-user', esureAuthenticated, profileUserController.handle);
export{routesUser}