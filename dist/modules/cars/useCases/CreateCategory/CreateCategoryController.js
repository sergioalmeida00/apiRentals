"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryController = void 0;
var _tsyringe = require("tsyringe");
var _CreateCategoryUseCase = require("./CreateCategoryUseCase");
class CreateCategoryController {
  // private createCategoryUseCase:CreateCategoryUseCase;

  // constructor(createCategoryUseCase:CreateCategoryUseCase){

  //     this.createCategoryUseCase = createCategoryUseCase;
  // }

  async handle(request, response) {
    const {
      name,
      description
    } = request.body;
    const createCategoryUseCase = _tsyringe.container.resolve(_CreateCategoryUseCase.CreateCategoryUseCase);
    const resultCategory = await createCategoryUseCase.execute({
      name,
      description
    });
    return response.status(201).json(resultCategory);
  }
}
exports.CreateCategoryController = CreateCategoryController;