"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationUseCase = void 0;
var _ICarRepository = require("@modules/cars/repositories/ICarRepository");
var _ISpecificationReposytory = require("@modules/cars/repositories/ISpecificationReposytory");
var _AppError = require("@shared/erros/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let CreateCarSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarRepository.ICarRepository === "undefined" ? Object : _ICarRepository.ICarRepository, typeof _ISpecificationReposytory.ISpecificationRepository === "undefined" ? Object : _ISpecificationReposytory.ISpecificationRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarSpecificationUseCase {
  constructor(carRespository, specificationRepository) {
    this.carRespository = carRespository;
    this.specificationRepository = specificationRepository;
  }
  async execute({
    car_id,
    specification_id
  }) {
    const carExists = await this.carRespository.findById(car_id);
    if (!carExists) {
      throw new _AppError.AppError("Car does not Exists!!");
    }
    const specifications = await this.specificationRepository.findByIds(specification_id);
    carExists.specifications = specifications;
    await this.carRespository.create(carExists);
    return carExists;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;