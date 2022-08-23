import { Router } from "express";
import {esureAuthenticated} from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";



const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionController()
const routesRental = Router();

routesRental.post("/",esureAuthenticated, createRentalController.handle);
routesRental.post("/devolution/:id", esureAuthenticated, devolutionRentalController.handle);

export {routesRental}

