import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const routerPassword = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController() ;

routerPassword.post('/forgot', sendForgotPasswordMailController.handle);

export {routerPassword}