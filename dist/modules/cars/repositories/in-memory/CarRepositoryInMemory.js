"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarRepositoryInMemory = void 0;
var _Car = require("@modules/cars/infra/entities/Car");
class CarRepositoryInMemory {
  constructor() {
    this.cars = [];
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      ...(id && {
        id
      })
    });
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }
  async findAvailable(category_id, brand, name) {
    const all = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }
      return null;
    });
    return all;
  }
  async findById(id) {
    const car = this.cars.find(car => car.id === id);
    return car;
  }
  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }
}
exports.CarRepositoryInMemory = CarRepositoryInMemory;