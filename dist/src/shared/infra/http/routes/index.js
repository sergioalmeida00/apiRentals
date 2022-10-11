"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const categories_routes_1 = require("./categories.routes");
const specification_routes_1 = require("./specification.routes");
const user_routes_1 = require("./user.routes");
const autenticationUser_routes_1 = require("./autenticationUser.routes");
const cars_routes_1 = require("./cars.routes");
const rental_routes_1 = require("./rental.routes");
const password_routes_1 = require("./password.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/categories', categories_routes_1.routesCategories);
router.use('/specification', specification_routes_1.routesSpecification);
router.use('/users', user_routes_1.routesUser);
router.use('/cars', cars_routes_1.carsRoutes);
router.use('/rentals', rental_routes_1.routesRental);
router.use('/password', password_routes_1.routerPassword);
router.use(autenticationUser_routes_1.routesAutenticationUser);
