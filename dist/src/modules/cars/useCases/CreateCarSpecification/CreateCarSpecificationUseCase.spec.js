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
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/erros/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let carRepositoryInMemory;
let createCarSpecificationUseCase;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory_1.CarRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it("Should not be able to add a new specification to a now-existent car", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const car_id = "1234";
            const specification_id = ["54321"];
            yield createCarSpecificationUseCase.execute({
                car_id,
                specification_id
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
    it("Should be able to add a new specification to a car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carRepositoryInMemory.create({
            name: "CarSérgio",
            description: "Create Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "GOL",
            category_id: "CategorySérgio"
        });
        const specification = yield specificationsRepositoryInMemory.create({
            description_specification: "Test Description",
            name_specification: "TEst name Description"
        });
        const specificationCar = yield createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id: [specification.id_specification],
        });
        expect(specificationCar).toHaveProperty("specifications");
        expect(specificationCar.specifications.length).toBe(1);
    }));
});
