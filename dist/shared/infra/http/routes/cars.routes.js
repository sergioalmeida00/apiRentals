"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _upload = _interopRequireDefault(require("@config/upload"));
var _CreateCarController = require("@modules/cars/useCases/CreateCar/CreateCarController");
var _ensureAdmin = require("@shared/infra/http/middlewares/ensureAdmin");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
var _ListCarController = require("@modules/cars/useCases/ListCars/ListCarController");
var _CreateCarSpecificationController = require("@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController");
var _UploadCarImageController = require("@modules/cars/useCases/UploadCarImage/UploadCarImageController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailable = new _ListCarController.ListCarController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
const uploadCarImages = (0, _multer.default)(_upload.default);
carsRoutes.post("/", _ensureAuthenticated.esureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailable.handle);
carsRoutes.post("/specifications/:id", _ensureAuthenticated.esureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", _ensureAuthenticated.esureAuthenticated, _ensureAdmin.ensureAdmin, uploadCarImages.array('images'), uploadCarImageController.handle);