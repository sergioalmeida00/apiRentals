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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("@modules/accounts/infra/entities/User");
class UserRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(User_1.User);
    }
    create({ name, password, email, driver_license, id, avatar }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repository.create({
                name,
                password,
                email,
                driver_license,
                id,
                avatar,
            });
            yield this.repository.save(user);
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({
                where: { email }
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne(id);
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
