"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Car = void 0;
var _Rental = require("@modules/rentals/infra/entities/Rental");
var _typeorm = require("typeorm");
var _uuid = require("uuid");
var _Category = require("./Category");
var _Specification = require("./Specification");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let Car = (_dec = (0, _typeorm.Entity)("cars"), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec4 = (0, _typeorm.PrimaryColumn)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.OneToMany)(() => _Rental.Rental, rental => rental.car), _dec7 = Reflect.metadata("design:type", typeof _Rental.Rental === "undefined" ? Object : _Rental.Rental), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", Number), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", Boolean), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", Number), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.ManyToOne)(() => _Category.Category), _dec23 = (0, _typeorm.JoinColumn)({
  name: "category_id"
}), _dec24 = Reflect.metadata("design:type", typeof _Category.Category === "undefined" ? Object : _Category.Category), _dec25 = (0, _typeorm.Column)(), _dec26 = Reflect.metadata("design:type", String), _dec27 = (0, _typeorm.ManyToMany)(() => _Specification.Specification), _dec28 = (0, _typeorm.JoinTable)({
  name: "specifications_cars",
  joinColumns: [{
    name: "car_id"
  }],
  inverseJoinColumns: [{
    name: "specification_id"
  }]
}), _dec29 = Reflect.metadata("design:type", Array), _dec30 = (0, _typeorm.CreateDateColumn)(), _dec31 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class Car {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "rentals", _descriptor2, this);
    _initializerDefineProperty(this, "name", _descriptor3, this);
    _initializerDefineProperty(this, "description", _descriptor4, this);
    _initializerDefineProperty(this, "daily_rate", _descriptor5, this);
    _initializerDefineProperty(this, "available", _descriptor6, this);
    _initializerDefineProperty(this, "license_plate", _descriptor7, this);
    _initializerDefineProperty(this, "fine_amount", _descriptor8, this);
    _initializerDefineProperty(this, "brand", _descriptor9, this);
    _initializerDefineProperty(this, "category", _descriptor10, this);
    _initializerDefineProperty(this, "category_id", _descriptor11, this);
    _initializerDefineProperty(this, "specifications", _descriptor12, this);
    _initializerDefineProperty(this, "created_at", _descriptor13, this);
    if (!this.id) {
      this.id = (0, _uuid.v4)();
      this.available = true;
      this.created_at = new Date();
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rentals", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "daily_rate", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "available", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "license_plate", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fine_amount", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "brand", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "category", [_dec22, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "category_id", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "specifications", [_dec27, _dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
exports.Car = Car;