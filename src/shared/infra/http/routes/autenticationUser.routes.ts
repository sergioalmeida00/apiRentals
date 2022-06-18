import { Router } from "express";
import { AutenticationuserController } from "@modules/accounts/useCases/autenticationUser/AutenticationUserUseController";

const routesAutenticationUser = Router();
const autenticationUserController = new AutenticationuserController();



routesAutenticationUser.post('/sessions', autenticationUserController.handle);

export {routesAutenticationUser}