"use strict";

var _typeorm = require("typeorm");
var _supertest = _interopRequireDefault(require("supertest"));
var _uuid = require("uuid");
var _bcrypt = require("bcrypt");
var _app = require("@shared/infra/http/app");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let connection;
describe("List Categories", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id,name,email, password, "isAdmin", created_at, driver_license)
             VALUES ( '${id}', 'admin','admin@rentex.com.br', '${password}', true, 'now()','XXXXXXX' ) `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to list categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentex.com.br",
      password: "admin"
    });
    const {
      token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Test List Categories",
      description: "Category SuperTest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.status).toBe(201);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Test List Categories");
  });
});