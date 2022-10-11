"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;
var _Category = require("@modules/cars/infra/entities/Category");
class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }
  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
    return category;
  }
  async listCattegories() {
    const listCategories = this.categories;
    return listCategories;
  }
  async findByCategory(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}
exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;