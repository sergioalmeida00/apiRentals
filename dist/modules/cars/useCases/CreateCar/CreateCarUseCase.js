"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;
var _ICarRepository = require("@modules/cars/repositories/ICarRepository");
var _AppError = require("@shared/erros/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarRepository.ICarRepository === "undefined" ? Object : _ICarRepository.ICarRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCarUseCase {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }) {
    const carAlreadyExists = await this.carRepository.findByLicensePlate(license_plate);
    if (carAlreadyExists) {
      throw new _AppError.AppError("Car already exists!!");
    }
    const car = await this.carRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
    return car;
  }
}) || _class) || _class) || _class) || _class);
exports.CreateCarUseCase = CreateCarUseCase;