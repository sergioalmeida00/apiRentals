"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;
var _tsyringe = require("tsyringe");
var _ISpecificationReposytory = require("@modules/cars/repositories/ISpecificationReposytory");
var _AppError = require("@shared/erros/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationReposytory.ISpecificationRepository === "undefined" ? Object : _ISpecificationReposytory.ISpecificationRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationUseCase {
  constructor(specificationsRepository) {
    this.specificationsRepository = void 0;
    this.specificationsRepository = specificationsRepository;
  }
  async execute({
    name_specification,
    description_specification
  }) {
    const specificationAlreadyExists = await this.specificationsRepository.findBySpecification(name_specification);
    if (specificationAlreadyExists) {
      throw new _AppError.AppError("Specification already exists");
    }
    const resultSpecification = await this.specificationsRepository.create({
      name_specification,
      description_specification
    });
    return resultSpecification;
  }
}) || _class) || _class) || _class) || _class);
exports.CreateSpecificationUseCase = CreateSpecificationUseCase;