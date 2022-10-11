"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;
var _Specification = require("@modules/cars/infra/entities/Specification");
class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }
  async create({
    name_specification,
    description_specification
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name_specification,
      description_specification
    });
    this.specifications.push(specification);
    return specification;
  }
  async findBySpecification(name) {
    return this.specifications.find(specification => specification.name_specification === name);
  }
  async listSpecification() {
    return this.specifications;
  }
  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(sepecification => ids.includes(sepecification.id_specification));
    return allSpecifications;
  }
}
exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;