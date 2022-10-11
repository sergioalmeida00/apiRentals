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
const CarRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarRepositoryInMemory");
const AppError_1 = require("@shared/erros/AppError");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
let createCarUseCase;
let carRepository;
describe('Creat Car', () => {
    beforeEach(() => {
        carRepository = new CarRepositoryInMemory_1.CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carRepository);
    });
    it("Should be able to create a new car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "Car",
            description: "Create Car",
            daily_rate: 1,
            license_plate: "ABC-123",
            fine_amount: 100,
            brand: "GOL",
            category_id: "Category"
        });
        expect(car).toHaveProperty("id");
    }));
    it("Should not be able to create a car with exists license plate", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createCarUseCase.execute({
                name: "Car1",
                description: "Create Car",
                daily_rate: 1,
                license_plate: "ABC-123",
                fine_amount: 100,
                brand: "GOL",
                category_id: "Category"
            });
            yield createCarUseCase.execute({
                name: "Car2",
                description: "Create Car",
                daily_rate: 1,
                license_plate: "ABC-123",
                fine_amount: 100,
                brand: "GOL",
                category_id: "Category"
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
    it("Should not be able to create a car with available true by defalt", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "Car76",
            description: "Create Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "GOL",
            category_id: "Category"
        });
        expect(car.available).toBe(true);
    }));
});
