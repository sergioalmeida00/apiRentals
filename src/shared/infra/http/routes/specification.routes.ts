import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/ListSpecifications/ListSpecificationController";
import { esureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const routesSpecification = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

// routesSpecification.use(esureAuthenticated);
routesSpecification.post("/",esureAuthenticated,ensureAdmin,createSpecificationController.handle);

routesSpecification.get("/", listSpecificationController.handle)


export{routesSpecification}