"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsUseCase = void 0;
var _ICarRepository = require("@modules/cars/repositories/ICarRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let ListCarsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarRepository.ICarRepository === "undefined" ? Object : _ICarRepository.ICarRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCarsUseCase {
  constructor(carRespository) {
    this.carRespository = carRespository;
  }
  async execute({
    category_id,
    brand,
    name
  }) {
    const cars = await this.carRespository.findAvailable(category_id, brand, name);
    return cars;
  }
}) || _class) || _class) || _class) || _class);
exports.ListCarsUseCase = ListCarsUseCase;