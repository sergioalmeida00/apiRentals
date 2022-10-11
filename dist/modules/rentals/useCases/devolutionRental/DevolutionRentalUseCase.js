"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;
var _ICarRepository = require("@modules/cars/repositories/ICarRepository");
var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("@shared/erros/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarRepository.ICarRepository === "undefined" ? Object : _ICarRepository.ICarRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }
  async execute({
    id,
    user_id
  }) {
    const minimum_daily = 1;
    let total = 0;
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    if (!rental) {
      throw new _AppError.AppError("Rental does not exists!");
    }
    const dateNow = this.dateProvider.dateNow();
    let dailyValue = this.dateProvider.compareInDays(rental.start_date, dateNow);
    if (dailyValue <= 0) {
      dailyValue = minimum_daily;
    }
    let delayValue = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);
    if (delayValue > 0) {
      const calculate_fine = delayValue * car.fine_amount;
      total = calculate_fine;
    }
    total += dailyValue * car.daily_rate;
    rental.end_date = dateNow;
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;