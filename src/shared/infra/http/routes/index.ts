import { Router } from "express";
import { routesCategories } from "./categories.routes";
import { routesSpecification } from "./specification.routes";
import { routesUser } from "./user.routes";
import { routesAutenticationUser } from "./autenticationUser.routes";
import { carsRoutes } from "./cars.routes";
import { routesRental } from "./rental.routes";
import { routerPassword } from "./password.routes";


const router = Router();

router.use('/categories',routesCategories);
router.use('/specification',routesSpecification);
router.use('/users', routesUser);
router.use('/cars', carsRoutes);
router.use('/rentals',routesRental);
router.use('/password',routerPassword);
router.use(routesAutenticationUser)

export{router}