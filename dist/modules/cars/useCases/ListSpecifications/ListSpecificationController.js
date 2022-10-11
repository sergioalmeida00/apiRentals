"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationController = void 0;
var _tsyringe = require("tsyringe");
var _ListSpecificationUseCase = require("./ListSpecificationUseCase");
class ListSpecificationController {
  async handle(request, response) {
    const listspecificationUseCase = _tsyringe.container.resolve(_ListSpecificationUseCase.ListSpecificationUseCase);
    const resultListSpecification = await listspecificationUseCase.execute();
    return response.status(201).json({
      resultListSpecification
    });
  }
}
exports.ListSpecificationController = ListSpecificationController;