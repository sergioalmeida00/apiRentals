"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;
var _Category = require("@modules/cars/infra/entities/Category");
var _typeorm = require("typeorm");
class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }
  async create({
    name,
    description
  }) {
    const category = await this.repository.create({
      description,
      name
    });
    await this.repository.save(category);
    return category;
  }
  async listCattegories() {
    const categories = await this.repository.find();
    return categories;
  }
  async findByCategory(name) {
    const category = await this.repository.findOne({
      where: {
        name
      }
    });
    return category;
  }
}
exports.CategoriesRepository = CategoriesRepository;