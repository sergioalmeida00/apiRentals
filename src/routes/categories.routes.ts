import { Router } from "express";
import multer from "multer";
import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const routesCategories = Router();
const upload = multer({
    dest:'./tmp'
});

// CREATE CATEGORY
routesCategories.post('/', (request,response) =>{
    return createCategoryController.handle(request,response);
});

// GET ALL CATEGORIES
routesCategories.get('/',(request, response) =>{
    return listCategoriesController.handle(request, response);
});

// IMPORT CSV
routesCategories.post('/import',upload.single("file"), (request,response)=>{
    
    return importCategoryController.handle(request,response);
});


export {routesCategories}