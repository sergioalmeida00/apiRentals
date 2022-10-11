"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationController = void 0;
var _CreateSpecificationUseCase = require("./CreateSpecificationUseCase");
var _tsyringe = require("tsyringe");
class CreateSpecificationController {
  async handle(request, response) {
    const {
      name_specification,
      description_specification
    } = request.body;
    const createSpecificationUseCase = _tsyringe.container.resolve(_CreateSpecificationUseCase.CreateSpecificationUseCase);
    const resultCreateSpecification = await createSpecificationUseCase.execute({
      name_specification,
      description_specification
    });
    return response.status(201).json(resultCreateSpecification);
  }
}
exports.CreateSpecificationController = CreateSpecificationController;