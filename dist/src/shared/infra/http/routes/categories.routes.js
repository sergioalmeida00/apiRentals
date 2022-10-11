"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesCategories = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateCategoryController_1 = require("@modules/cars/useCases/CreateCategory/CreateCategoryController");
// import  createCategoryController from "../modules/cars/useCases/CreateCategory";
// import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
const ImportCategoryController_1 = require("@modules/cars/useCases/ImportCategory/ImportCategoryController");
// import { listCategoriesController } from "../modules/cars/useCases/ListCategories";
const ListCategoriesController_1 = require("@modules/cars/useCases/ListCategories/ListCategoriesController");
const ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
const ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
const routesCategories = (0, express_1.Router)();
exports.routesCategories = routesCategories;
const upload = (0, multer_1.default)({
    dest: './tmp'
});
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const importCategoryController = new ImportCategoryController_1.ImportCategoryController();
const listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
// CREATE CATEGORY
routesCategories.post('/', ensureAuthenticated_1.esureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
// GET ALL CATEGORIES
routesCategories.get('/', listCategoriesController.handle);
// IMPORT CSV
routesCategories.post('/import', upload.single("file"), importCategoryController.handle);
