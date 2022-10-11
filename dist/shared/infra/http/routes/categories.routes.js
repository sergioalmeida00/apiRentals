"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesCategories = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _CreateCategoryController = require("@modules/cars/useCases/CreateCategory/CreateCategoryController");
var _ImportCategoryController = require("@modules/cars/useCases/ImportCategory/ImportCategoryController");
var _ListCategoriesController = require("@modules/cars/useCases/ListCategories/ListCategoriesController");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
var _ensureAdmin = require("@shared/infra/http/middlewares/ensureAdmin");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import  createCategoryController from "../modules/cars/useCases/CreateCategory";
// import { importCategoryController } from "../modules/cars/useCases/ImportCategory";

// import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const routesCategories = (0, _express.Router)();
exports.routesCategories = routesCategories;
const upload = (0, _multer.default)({
  dest: './tmp'
});
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const listCategoriesController = new _ListCategoriesController.ListCategoriesController();
// CREATE CATEGORY
routesCategories.post('/', _ensureAuthenticated.esureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);

// GET ALL CATEGORIES
routesCategories.get('/', listCategoriesController.handle);

// IMPORT CSV
routesCategories.post('/import', upload.single("file"), importCategoryController.handle);