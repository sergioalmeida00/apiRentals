"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarRespository = void 0;
var _typeorm = require("typeorm");
var _Car = require("../entities/Car");
class CarRespository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
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
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    });
    return car;
  }
  async findAvailable(category_id, brand, name) {
    const carQuery = await this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });
    if (category_id) {
      carQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }
    if (brand) {
      carQuery.andWhere("UPPER(brand) = UPPER(:brand)", {
        brand
      });
    }
    if (name) {
      carQuery.andWhere("UPPER(name) = UPPER(:name)", {
        name
      });
    }
    const cars = await carQuery.getMany();
    return cars;
  }
  async findById(car_id) {
    const car = await this.repository.findOne({
      where: {
        id: car_id
      }
    });
    return car;
  }
  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }
}
exports.CarRespository = CarRespository;