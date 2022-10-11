"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsController = void 0;
var _tsyringe = require("tsyringe");
var _ListRentalsUserUseCase = require("./ListRentalsUserUseCase");
class ListRentalsController {
  async handle(request, response) {
    const listRentalsUserUseCase = _tsyringe.container.resolve(_ListRentalsUserUseCase.ListRentalsUserUseCase);
    const {
      id
    } = request.user;
    const rentalsList = await listRentalsUserUseCase.execute(id);
    return response.status(200).json(rentalsList);
  }
}
exports.ListRentalsController = ListRentalsController;