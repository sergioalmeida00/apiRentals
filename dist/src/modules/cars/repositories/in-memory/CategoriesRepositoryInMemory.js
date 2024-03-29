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
exports.CategoriesRepositoryInMemory = void 0;
const Category_1 = require("@modules/cars/infra/entities/Category");
class CategoriesRepositoryInMemory {
    constructor() {
        this.categories = [];
    }
    create({ name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new Category_1.Category();
            Object.assign(category, {
                name, description
            });
            this.categories.push(category);
            return category;
        });
    }
    listCattegories() {
        return __awaiter(this, void 0, void 0, function* () {
            const listCategories = this.categories;
            return listCategories;
        });
    }
    findByCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.categories.find(category => category.name === name);
            return category;
        });
    }
}
exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;
