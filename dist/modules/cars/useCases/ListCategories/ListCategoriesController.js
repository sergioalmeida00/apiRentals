"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesController = void 0;
var _tsyringe = require("tsyringe");
var _ListCategoriesUseCase = require("./ListCategoriesUseCase");
class ListCategoriesController {
  async handle(request, response) {
    const listCategorisUseCase = _tsyringe.container.resolve(_ListCategoriesUseCase.ListCategoriesUseCase);
    const listAll = await listCategorisUseCase.execute();
    return response.status(201).json(listAll);
  }
}
exports.ListCategoriesController = ListCategoriesController;