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
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const index_1 = __importDefault(require("../index"));
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, index_1.default)("localhost");
        const id = (0, uuid_1.v4)();
        const passaword = yield (0, bcrypt_1.hash)("admin", 8);
        yield connection.query(`INSERT INTO USERS(id,name,email, password, "isAdmin", created_at, driver_license)
         VALUES ( '${id}', 'admin','admin@rentex.com.br', '${passaword}', true, 'now()','XXXXXXX' ) `);
        yield connection.close;
    });
}
create().then(() => console.log("User admin created!"));
