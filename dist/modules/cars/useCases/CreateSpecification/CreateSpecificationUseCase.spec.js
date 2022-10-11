"use strict";

var _SpecificationsRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
var _AppError = require("@shared/erros/AppError");
var _CreateSpecificationUseCase = require("./CreateSpecificationUseCase");
let specificationsRepositoryInMemory;
let createSpecificationUseCase;
describe("Create Specification", () => {
  beforeAll(() => {
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new _CreateSpecificationUseCase.CreateSpecificationUseCase(specificationsRepositoryInMemory);
  });
  it("should be able create a specification", async () => {
    const specification = await createSpecificationUseCase.execute({
      description_specification: "George Hamilton",
      name_specification: "Brett Woods"
    });
    expect(specification).toHaveProperty('id_specification');
    expect(specification.name_specification).toEqual("Brett Woods");
  });
  it("should not be able  create specification name existing", async () => {
    await expect(async () => {
      await createSpecificationUseCase.execute({
        description_specification: "George Hamilton",
        name_specification: "Brett Woods"
      });
      await createSpecificationUseCase.execute({
        description_specification: "George Hamilton",
        name_specification: "Brett Woods"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});