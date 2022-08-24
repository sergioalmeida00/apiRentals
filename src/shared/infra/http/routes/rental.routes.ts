import { Router } from "express";
import {esureAuthenticated} from "@shared/infra/http/middlewares/ensureAuthenticated"
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsUserController";



const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionController();
const listRentalsUserController = new ListRentalsController();
const routesRental = Router();

routesRental.post("/",esureAuthenticated, createRentalController.handle);
routesRental.post("/devolution/:id", esureAuthenticated, devolutionRentalController.handle);
routesRental.get("/user", esureAuthenticated,listRentalsUserController.handle);


export {routesRental}

