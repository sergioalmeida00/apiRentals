"use strict";

var _CarRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarRepositoryInMemory");
var _ListCarsUseCase = require("./ListCarsUseCase");
let listCarsUseCase;
let carRespository;
describe("List Cars", () => {
  beforeEach(() => {
    carRespository = new _CarRepositoryInMemory.CarRepositoryInMemory();
    listCarsUseCase = new _ListCarsUseCase.ListCarsUseCase(carRespository);
  });
  it("Should be able to list all available cars", async () => {
    const car = await carRespository.create({
      name: "gol1",
      description: "Motor Car1",
      daily_rate: 110,
      license_plate: "ABC-123",
      fine_amount: 40,
      brand: "wv",
      category_id: "Category1"
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by brand", async () => {
    const car = await carRespository.create({
      name: "gol2",
      description: "Motor Car2",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "wv",
      category_id: "Category2"
    });
    const cars = await listCarsUseCase.execute({
      brand: "wv"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by name", async () => {
    const car = await carRespository.create({
      name: "gol3",
      description: "Motor Car3",
      daily_rate: 110,
      license_plate: "ABC-12345",
      fine_amount: 40,
      brand: "wv",
      category_id: "Category3"
    });
    const cars = await listCarsUseCase.execute({
      name: "wv"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by category", async () => {
    const car = await carRespository.create({
      name: "gol4",
      description: "Motor Car4",
      daily_rate: 110,
      license_plate: "ABC-123456",
      fine_amount: 40,
      brand: "wv",
      category_id: "12345"
    });
    const cars = await listCarsUseCase.execute({
      category_id: "12345"
    });
    expect(cars).toEqual([car]);
  });
});