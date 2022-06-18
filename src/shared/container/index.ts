import { container } from "tsyringe";
import { UserRepository } from "@modules/accounts/infra/reposiroties/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/repositories/CategoriesRepository";


import { SpecificationRepository } from "@modules/cars/infra/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationReposytory";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { CarRespository } from "@modules/cars/infra/repositories/CarRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarImageRepository } from "@modules/cars/infra/repositories/CarImageRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<ICarRepository>(
    "CarsRepository",
    CarRespository
)

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarImageRepository
);