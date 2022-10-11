"use strict";

var _tsyringe = require("tsyringe");
require("@shared/container/providers");
var _UserRepository = require("@modules/accounts/infra/reposiroties/UserRepository");
var _CategoriesRepository = require("@modules/cars/infra/repositories/CategoriesRepository");
var _SpecificationRepository = require("@modules/cars/infra/repositories/SpecificationRepository");
var _CarRepository = require("@modules/cars/infra/repositories/CarRepository");
var _CarImageRepository = require("@modules/cars/infra/repositories/CarImageRepository");
var _RentalsRepository = require("@modules/rentals/infra/repositories/RentalsRepository");
var _UsersTokensRepository = require("@modules/accounts/infra/reposiroties/UsersTokensRepository");
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);
_tsyringe.container.registerSingleton("SpecificationRepository", _SpecificationRepository.SpecificationRepository);
_tsyringe.container.registerSingleton("UserRepository", _UserRepository.UserRepository);
_tsyringe.container.registerSingleton("CarsRepository", _CarRepository.CarRespository);
_tsyringe.container.registerSingleton("CarsImagesRepository", _CarImageRepository.CarImageRepository);
_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);
_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);