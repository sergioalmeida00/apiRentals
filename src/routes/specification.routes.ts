import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";
import { listSpecificationController } from "../modules/cars/useCases/ListSpecifications";

const routesSpecification = Router();

routesSpecification.post("/",(request,response)=>{
    return createSpecificationController.handle(request,response)
});

routesSpecification.get("/", (request, response) =>{
    return listSpecificationController.handle(request, response);
})


export{routesSpecification}