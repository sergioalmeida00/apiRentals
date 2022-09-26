import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const routerPassword = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController() ;
const resetPasswordUserController = new ResetPasswordUserController();

routerPassword.post('/forgot', sendForgotPasswordMailController.handle);
routerPassword.post('/reset', resetPasswordUserController.handle);

export {routerPassword}