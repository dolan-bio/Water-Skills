"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterPoint = void 0;
var Phaser = require("phaser-ce");
var WaterPoint = (function (_super) {
    __extends(WaterPoint, _super);
    function WaterPoint(game, x, y, targetHeight, k) {
        var _this = _super.call(this, x, y) || this;
        _this.game = game;
        _this.targetHeight = targetHeight;
        _this.k = k;
        _this.speed = 0;
        return _this;
    }
    WaterPoint.prototype.update = function (dampening, tension) {
        var deltaY = this.targetHeight - this.y;
        this.speed += tension * deltaY - this.speed * dampening;
        this.y += this.speed;
    };
    WaterPoint.prototype.setHeight = function (height) {
        this.targetHeight = height;
        this.y = height;
    };
    return WaterPoint;
}(Phaser.Point));
exports.WaterPoint = WaterPoint;
//# sourceMappingURL=water-point.js.map