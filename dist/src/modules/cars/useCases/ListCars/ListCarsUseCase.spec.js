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
const ListCarsUseCase_1 = require("./ListCarsUseCase");
let listCarsUseCase;
let carRespository;
describe("List Cars", () => {
    beforeEach(() => {
        carRespository = new CarRepositoryInMemory_1.CarRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase_1.ListCarsUseCase(carRespository);
    });
    it("Should be able to list all available cars", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carRespository.create({
            name: "gol1",
            description: "Motor Car1",
            daily_rate: 110,
            license_plate: "ABC-123",
            fine_amount: 40,
            brand: "wv",
            category_id: "Category1"
        });
        const cars = yield listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    }));
    it("Should be able to list all available cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carRespository.create({
            name: "gol2",
            description: "Motor Car2",
            daily_rate: 110,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "wv",
            category_id: "Category2"
        });
        const cars = yield listCarsUseCase.execute({
            brand: "wv"
        });
        expect(cars).toEqual([car]);
    }));
    it("Should be able to list all available cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carRespository.create({
            name: "gol3",
            description: "Motor Car3",
            daily_rate: 110,
            license_plate: "ABC-12345",
            fine_amount: 40,
            brand: "wv",
            category_id: "Category3"
        });
        const cars = yield listCarsUseCase.execute({
            name: "wv"
        });
        expect(cars).toEqual([car]);
    }));
    it("Should be able to list all available cars by category", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carRespository.create({
            name: "gol4",
            description: "Motor Car4",
            daily_rate: 110,
            license_plate: "ABC-123456",
            fine_amount: 40,
            brand: "wv",
            category_id: "12345"
        });
        const cars = yield listCarsUseCase.execute({
            category_id: "12345"
        });
        expect(cars).toEqual([car]);
    }));
});
