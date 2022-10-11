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
exports.SpecificationsRepositoryInMemory = void 0;
const Specification_1 = require("@modules/cars/infra/entities/Specification");
class SpecificationsRepositoryInMemory {
    constructor() {
        this.specifications = [];
    }
    create({ name_specification, description_specification }) {
        return __awaiter(this, void 0, void 0, function* () {
            const specification = new Specification_1.Specification();
            Object.assign(specification, {
                name_specification,
                description_specification
            });
            this.specifications.push(specification);
            return specification;
        });
    }
    findBySpecification(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.specifications.find(specification => specification.name_specification === name);
        });
    }
    listSpecification() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.specifications;
        });
    }
    findByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const allSpecifications = this.specifications.filter(sepecification => ids.includes(sepecification.id_specification));
            return allSpecifications;
        });
    }
}
exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;
