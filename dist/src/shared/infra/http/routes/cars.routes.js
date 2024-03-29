"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const CreateCarController_1 = require("@modules/cars/useCases/CreateCar/CreateCarController");
const ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
const ListCarController_1 = require("@modules/cars/useCases/ListCars/ListCarController");
const CreateCarSpecificationController_1 = require("@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController");
const UploadCarImageController_1 = require("@modules/cars/useCases/UploadCarImage/UploadCarImageController");
const carsRoutes = (0, express_1.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new CreateCarController_1.CreateCarController();
const listAvailable = new ListCarController_1.ListCarController();
const createCarSpecificationController = new CreateCarSpecificationController_1.CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController_1.UploadCarImageController();
const uploadCarImages = (0, multer_1.default)(upload_1.default);
carsRoutes.post("/", ensureAuthenticated_1.esureAuthenticated, ensureAdmin_1.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailable.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated_1.esureAuthenticated, ensureAdmin_1.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated_1.esureAuthenticated, ensureAdmin_1.ensureAdmin, uploadCarImages.array('images'), uploadCarImageController.handle);
