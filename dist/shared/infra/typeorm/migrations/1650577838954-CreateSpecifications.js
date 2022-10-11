"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecifications1650577838954 = void 0;
var _typeorm = require("typeorm");
class CreateSpecifications1650577838954 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications",
      columns: [{
        name: "id_specification",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name_specification",
        type: "varchar"
      }, {
        name: "description_specification",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable("specifications");
  }
}
exports.CreateSpecifications1650577838954 = CreateSpecifications1650577838954;