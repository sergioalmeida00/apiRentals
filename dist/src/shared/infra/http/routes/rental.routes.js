"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesRental = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
const CreateRentalController_1 = require("@modules/rentals/useCases/createRental/CreateRentalController");
const DevolutionRentalController_1 = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");
const ListRentalsUserController_1 = require("@modules/rentals/useCases/listRentalsByUser/ListRentalsUserController");
const createRentalController = new CreateRentalController_1.CreateRentalController();
const devolutionRentalController = new DevolutionRentalController_1.DevolutionController();
const listRentalsUserController = new ListRentalsUserController_1.ListRentalsController();
const routesRental = (0, express_1.Router)();
exports.routesRental = routesRental;
routesRental.post("/", ensureAuthenticated_1.esureAuthenticated, createRentalController.handle);
routesRental.post("/devolution/:id", ensureAuthenticated_1.esureAuthenticated, devolutionRentalController.handle);
routesRental.get("/user", ensureAuthenticated_1.esureAuthenticated, listRentalsUserController.handle);
