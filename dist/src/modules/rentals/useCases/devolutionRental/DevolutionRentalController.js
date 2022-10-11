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
exports.DevolutionController = void 0;
const tsyringe_1 = require("tsyringe");
const DevolutionRentalUseCase_1 = require("./DevolutionRentalUseCase");
class DevolutionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const devolutionRentalUseCase = tsyringe_1.container.resolve(DevolutionRentalUseCase_1.DevolutionRentalUseCase);
            const { id: user_id } = request.user;
            const { id } = request.params;
            const rental = yield devolutionRentalUseCase.execute({
                id,
                user_id
            });
            return response.status(200).json(rental);
        });
    }
}
exports.DevolutionController = DevolutionController;
