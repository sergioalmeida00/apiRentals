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
exports.CarRespository = void 0;
const typeorm_1 = require("typeorm");
const Car_1 = require("../entities/Car");
class CarRespository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Car_1.Car);
    }
    create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.repository.save(car);
            return car;
        });
    }
    findByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.repository.findOne({ where: { license_plate } });
            return car;
        });
    }
    findAvailable(category_id, brand, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const carQuery = yield this.repository.createQueryBuilder("c")
                .where("available = :available", { available: true });
            if (category_id) {
                carQuery.andWhere("category_id = :category_id", { category_id });
            }
            if (brand) {
                carQuery.andWhere("UPPER(brand) = UPPER(:brand)", { brand });
            }
            if (name) {
                carQuery.andWhere("UPPER(name) = UPPER(:name)", { name });
            }
            const cars = yield carQuery.getMany();
            return cars;
        });
    }
    findById(car_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.repository.findOne({ where: { id: car_id } });
            return car;
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder()
                .update()
                .set({ available })
                .where("id = :id")
                .setParameters({ id })
                .execute();
        });
    }
}
exports.CarRespository = CarRespository;
