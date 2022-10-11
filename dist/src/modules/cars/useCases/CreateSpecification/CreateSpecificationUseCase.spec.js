"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/erros/AppError");
const CreateSpecificationUseCase_1 = require("./CreateSpecificationUseCase");
let specificationsRepositoryInMemory;
let createSpecificationUseCase;
describe("Create Specification", () => {
    beforeAll(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase_1.CreateSpecificationUseCase(specificationsRepositoryInMemory);
    });
    it("should be able create a specification", () => __awaiter(void 0, void 0, void 0, function* () {
        const specification = yield createSpecificationUseCase.execute({
            description_specification: "George Hamilton",
            name_specification: "Brett Woods"
        });
        expect(specification).toHaveProperty('id_specification');
        expect(specification.name_specification).toEqual("Brett Woods");
    }));
    it("should not be able  create specification name existing", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createSpecificationUseCase.execute({
                description_specification: "George Hamilton",
                name_specification: "Brett Woods"
            });
            yield createSpecificationUseCase.execute({
                description_specification: "George Hamilton",
                name_specification: "Brett Woods"
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
