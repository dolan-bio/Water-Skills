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
exports.Water = void 0;
var Phaser = require("phaser-ce");
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(game, pixels, resolution, waterPoints) {
        var _this = _super.call(this, waterPoints) || this;
        _this.game = game;
        _this.pixels = pixels;
        _this.resolution = resolution;
        _this.waterPoints = waterPoints;
        _this.passThroughs = 1;
        _this.spread = 0.25;
        _this.game.physics.p2.enable(_this);
        _this.setHeight();
        return _this;
    }
    Water.prototype.update = function () {
        for (var i = 0; i < this.waterPoints.length - 2; i++) {
            this.waterPoints[i].update(0.025, 0.025);
        }
        this.applyPhysics();
        this.fixWaterPositions();
        this.anchorBottomPoints();
        this.points = this.waterPoints;
    };
    Water.prototype.splash = function (position, speed) {
        var singleLength = this.game.width / this.resolution;
        var index = Math.round(position / singleLength);
        if (index >= 0 && index < this.waterPoints.length) {
            this.waterPoints[index].speed = speed;
        }
    };
    Water.prototype.setHeight = function () {
        for (var i = 0; i <= this.waterPoints.length - 3; i++) {
            this.waterPoints[i].setHeight(this.game.height - this.pixels);
        }
    };
    Water.prototype.getWaterLevel = function (position) {
        var singleLength = this.game.width / this.resolution;
        var index = Math.round(position / singleLength);
        if (index >= this.waterPoints.length || index < 0) {
            return new Phaser.Point(0, this.waterPoints[0].y);
        }
        return new Phaser.Point(0, this.waterPoints[index].y);
    };
    Object.defineProperty(Water.prototype, "Height", {
        get: function () {
            return this.pixels;
        },
        enumerable: false,
        configurable: true
    });
    Water.prototype.applyPhysics = function () {
        var leftDeltas = Array();
        var rightDeltas = Array();
        for (var j = 0; j < this.passThroughs; j++) {
            for (var i = 0; i < this.waterPoints.length - 2; i++) {
                if (i > 0) {
                    leftDeltas[i] = this.spread * (this.waterPoints[i].y - this.waterPoints[i - 1].y);
                    this.waterPoints[i - 1].speed += leftDeltas[i];
                }
                if (i < this.waterPoints.length - 1) {
                    rightDeltas[i] = this.spread * (this.waterPoints[i].y - this.waterPoints[i + 1].y);
                    this.waterPoints[i + 1].speed += rightDeltas[i];
                }
            }
            for (var i = 0; i < this.waterPoints.length - 2; i++) {
                if (i > 0) {
                    this.waterPoints[i - 1].y += leftDeltas[i];
                }
                else if (i < this.waterPoints.length - 1) {
                    this.waterPoints[i + 1].y += rightDeltas[i];
                }
            }
        }
    };
    Water.prototype.fixWaterPositions = function () {
        var singleLength = this.game.width / this.resolution;
        for (var i = 0; i <= this.waterPoints.length - 3; i++) {
            this.waterPoints[i].x = singleLength * i;
        }
    };
    Water.prototype.anchorBottomPoints = function () {
        this.waterPoints[this.waterPoints.length - 2].x = this.game.width;
        this.waterPoints[this.waterPoints.length - 2].y = this.game.height;
        this.waterPoints[this.waterPoints.length - 1].y = this.game.height;
    };
    return Water;
}(Phaser.Polygon));
exports.Water = Water;
//# sourceMappingURL=water.js.map