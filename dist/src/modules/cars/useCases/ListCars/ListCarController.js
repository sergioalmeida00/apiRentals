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
exports.ListCarController = void 0;
const tsyringe_1 = require("tsyringe");
const ListCarsUseCase_1 = require("./ListCarsUseCase");
class ListCarController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category_id, brand, name } = request.query;
            const listAvailableCarsUseCase = tsyringe_1.container.resolve(ListCarsUseCase_1.ListCarsUseCase);
            const car = yield listAvailableCarsUseCase.execute({
                category_id: category_id,
                brand: brand,
                name: name
            });
            return response.json({ car });
        });
    }
}
exports.ListCarController = ListCarController;
