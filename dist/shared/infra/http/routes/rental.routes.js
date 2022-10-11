"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesRental = void 0;
var _express = require("express");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
var _CreateRentalController = require("@modules/rentals/useCases/createRental/CreateRentalController");
var _DevolutionRentalController = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");
var _ListRentalsUserController = require("@modules/rentals/useCases/listRentalsByUser/ListRentalsUserController");
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionController();
const listRentalsUserController = new _ListRentalsUserController.ListRentalsController();
const routesRental = (0, _express.Router)();
exports.routesRental = routesRental;
routesRental.post("/", _ensureAuthenticated.esureAuthenticated, createRentalController.handle);
routesRental.post("/devolution/:id", _ensureAuthenticated.esureAuthenticated, devolutionRentalController.handle);
routesRental.get("/user", _ensureAuthenticated.esureAuthenticated, listRentalsUserController.handle);