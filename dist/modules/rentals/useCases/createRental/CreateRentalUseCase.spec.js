"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
var _AppError = require("@shared/erros/AppError");
var _CreateRentalUseCase = require("./CreateRentalUseCase");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _CarRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarRepositoryInMemory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayJsProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayJsProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarRepositoryInMemory.CarRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInMemory);
  });
  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 50,
      category_id: "4321",
      brand: "brand"
    });
    console.log(car.id);
    const rental = await createRentalUseCase.execute({
      user_id: "12",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it(" should not be able to create a new rental if there is another open to the same user ", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "1111",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it(" should not be able to create a new rental if there is another open to the same car ", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it("Should not be able to create a new rental with invalid return time.", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123536",
        car_id: "teste",
        expected_return_date: (0, _dayjs.default)().toDate()
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});