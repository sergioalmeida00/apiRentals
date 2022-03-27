import { Router } from "express";
import { routesCategories } from "./categories.routes";
import { routesSpecification } from "./specification.routes";
const router = Router();

router.use('/categories',routesCategories);
router.use('/specification',routesSpecification);

export{router}