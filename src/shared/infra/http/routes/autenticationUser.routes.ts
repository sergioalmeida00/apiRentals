import { Router } from "express";
import { AutenticationuserController } from "@modules/accounts/useCases/autenticationUser/AutenticationUserUseController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const routesAutenticationUser = Router();
const autenticationUserController = new AutenticationuserController();
const refreshTokenController = new RefreshTokenController();


routesAutenticationUser.post('/sessions', autenticationUserController.handle);
routesAutenticationUser.post('/refresh-token',refreshTokenController.handle);

export {routesAutenticationUser}