"use strict";

var _AppError = require("@shared/erros/AppError");
var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");
var _CreateCategoryUseCase = require("./CreateCategoryUseCase");
let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category Description"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByCategory(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able create a new category witch same name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category Description"
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});