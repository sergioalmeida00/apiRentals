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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const supertest_1 = __importDefault(require("supertest"));
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const app_1 = require("@shared/infra/http/app");
let connection;
describe("Create Category Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield (0, typeorm_1.createConnection)();
        yield connection.runMigrations();
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcrypt_1.hash)("admin", 8);
        yield connection.query(`INSERT INTO USERS(id,name,email, password, "isAdmin", created_at, driver_license)
             VALUES ( '${id}', 'admin','admin@rentex.com.br', '${password}', true, 'now()','XXXXXXX' ) `);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.dropDatabase();
        yield connection.close();
    }));
    it("Should be able to create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.app).post("/sessions")
            .send({
            email: "admin@rentex.com.br",
            password: "admin"
        });
        const { token } = responseToken.body;
        const response = yield (0, supertest_1.default)(app_1.app).post("/categories")
            .send({
            name: "Test a new Category",
            description: "Categorias de Carros SUV"
        })
            .set({
            Authorization: `Bearer ${token}`
        });
        expect(response.status).toBe(201);
    }));
    it("Should not be able to create a new category with name exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.app).post("/sessions")
            .send({
            email: "admin@rentex.com.br",
            password: "admin"
        });
        const { token } = responseToken.body;
        const response = yield (0, supertest_1.default)(app_1.app).post("/categories")
            .send({
            name: "Test a new Category",
            description: "Categorias de Carros SUV"
        })
            .set({
            Authorization: `Bearer ${token}`
        });
        expect(response.status).toBe(400);
    }));
});
