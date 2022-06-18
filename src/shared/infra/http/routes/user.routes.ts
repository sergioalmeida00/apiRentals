import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import upload from "@config/upload";
import { esureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const routesUser = Router();
const createUserController = new CreateUserController();
const updateUserAvatarUseCase = new UpdateUserAvatarController();



const uploadAvatar = multer(upload.upload('./tmp/avatar'));

routesUser.post('/', createUserController.handle);

routesUser.patch('/avatar',esureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarUseCase.handle);

export{routesUser}