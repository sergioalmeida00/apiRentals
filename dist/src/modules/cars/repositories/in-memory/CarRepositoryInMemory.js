"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRepositoryInMemory = void 0;
const Car_1 = require("@modules/cars/infra/entities/Car");
class CarRepositoryInMemory {
    constructor() {
        this.cars = [];
    }
    create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = new Car_1.Car();
            Object.assign(car, Object.assign({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications }, (id && { id })));
            this.cars.push(car);
            return car;
        });
    }
    findByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cars.find((car) => car.license_plate === license_plate);
        });
    }
    findAvailable(category_id, brand, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = this.cars.filter((car) => {
                if (car.available === true || (brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name)) {
                    return car;
                }
                return null;
            });
            return all;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.cars.find((car) => car.id === id);
            return car;
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            const findIndex = this.cars.findIndex((car) => car.id === id);
            this.cars[findIndex].available = available;
        });
    }
}
exports.CarRepositoryInMemory = CarRepositoryInMemory;
