"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesSpecification = void 0;
var _express = require("express");
var _CreateSpecificationController = require("@modules/cars/useCases/CreateSpecification/CreateSpecificationController");
var _ListSpecificationController = require("@modules/cars/useCases/ListSpecifications/ListSpecificationController");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
var _ensureAdmin = require("@shared/infra/http/middlewares/ensureAdmin");
const routesSpecification = (0, _express.Router)();
exports.routesSpecification = routesSpecification;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const listSpecificationController = new _ListSpecificationController.ListSpecificationController();

// routesSpecification.use(esureAuthenticated);
routesSpecification.post("/", _ensureAuthenticated.esureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
routesSpecification.get("/", listSpecificationController.handle);