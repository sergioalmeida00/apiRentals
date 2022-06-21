import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCategoryController";
// import  createCategoryController from "../modules/cars/useCases/CreateCategory";
// import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { ImportCategoryController } from "@modules/cars/useCases/ImportCategory/ImportCategoryController";
// import { listCategoriesController } from "../modules/cars/useCases/ListCategories";
import { ListCategoriesController } from "@modules/cars/useCases/ListCategories/ListCategoriesController";
import { esureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
const routesCategories = Router();
const upload = multer({
    dest:'./tmp'
});


const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
// CREATE CATEGORY
routesCategories.post('/',esureAuthenticated,ensureAdmin, createCategoryController.handle);

// GET ALL CATEGORIES
routesCategories.get('/', listCategoriesController.handle);

// IMPORT CSV
routesCategories.post('/import',upload.single("file"), importCategoryController.handle);


export {routesCategories}