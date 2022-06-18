import { Router } from "express";
import {esureAuthenticated} from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";



const createRentalController = new CreateRentalController();
const routesRental = Router();

routesRental.post("/",esureAuthenticated, createRentalController.handle);

export {routesRental}

