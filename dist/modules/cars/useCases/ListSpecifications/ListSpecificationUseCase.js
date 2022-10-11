"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationUseCase = void 0;
var _tsyringe = require("tsyringe");
var _ISpecificationReposytory = require("@modules/cars/repositories/ISpecificationReposytory");
var _dec, _dec2, _dec3, _dec4, _class;
let ListSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationReposytory.ISpecificationRepository === "undefined" ? Object : _ISpecificationReposytory.ISpecificationRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListSpecificationUseCase {
  constructor(specificationRepository) {
    this.specificationRepository = void 0;
    this.specificationRepository = specificationRepository;
  }
  async execute() {
    const resultSpecifications = await this.specificationRepository.listSpecification();
    return resultSpecifications;
  }
}) || _class) || _class) || _class) || _class);
exports.ListSpecificationUseCase = ListSpecificationUseCase;