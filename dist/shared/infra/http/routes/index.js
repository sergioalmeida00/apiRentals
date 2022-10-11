"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _categories = require("./categories.routes");
var _specification = require("./specification.routes");
var _user = require("./user.routes");
var _autenticationUser = require("./autenticationUser.routes");
var _cars = require("./cars.routes");
var _rental = require("./rental.routes");
var _password = require("./password.routes");
const router = (0, _express.Router)();
exports.router = router;
router.use('/categories', _categories.routesCategories);
router.use('/specification', _specification.routesSpecification);
router.use('/users', _user.routesUser);
router.use('/cars', _cars.carsRoutes);
router.use('/rentals', _rental.routesRental);
router.use('/password', _password.routerPassword);
router.use(_autenticationUser.routesAutenticationUser);