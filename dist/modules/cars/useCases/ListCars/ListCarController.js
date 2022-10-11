"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarController = void 0;
var _tsyringe = require("tsyringe");
var _ListCarsUseCase = require("./ListCarsUseCase");
class ListCarController {
  async handle(request, response) {
    const {
      category_id,
      brand,
      name
    } = request.query;
    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListCarsUseCase.ListCarsUseCase);
    const car = await listAvailableCarsUseCase.execute({
      category_id: category_id,
      brand: brand,
      name: name
    });
    return response.json({
      car
    });
  }
}
exports.ListCarController = ListCarController;