"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepository = void 0;
var _typeorm = require("typeorm");
var _Specification = require("@modules/cars/infra/entities/Specification");
// interface SpecificationDTO{
//     name_specification: string;
//     description_specification:string;
// }

class SpecificationRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }
  async create({
    name_specification,
    description_specification
  }) {
    const specification = await this.repository.create({
      name_specification,
      description_specification
    });
    await this.repository.save(specification);
    return specification;
  }
  async findBySpecification(name) {
    const specification = await this.repository.findOne({
      where: {
        name_specification: name
      }
    });
    return specification;
  }
  async listSpecification() {
    const result = await this.repository.find();
    return result;
  }
  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}
exports.SpecificationRepository = SpecificationRepository;