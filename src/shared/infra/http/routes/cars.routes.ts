import { Router } from "express";
import multer from "multer";
import upload from "@config/upload";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { esureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListCarController } from "@modules/cars/useCases/ListCars/ListCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/UploadCarImage/UploadCarImageController";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailable = new ListCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImages = multer(upload.upload('./tmp/cars'));

carsRoutes.post("/",esureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailable.handle);
carsRoutes.post("/specifications/:id",esureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", esureAuthenticated, ensureAdmin, uploadCarImages.array('images'),uploadCarImageController.handle);

export{carsRoutes}