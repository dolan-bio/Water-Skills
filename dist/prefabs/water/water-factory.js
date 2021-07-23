"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterFactory = void 0;
var Phaser = require("phaser-ce");
var water_1 = require("./water");
var water_point_1 = require("./water-point");
var WaterFactory = (function () {
    function WaterFactory(game) {
        this.game = game;
        this.k = 0.025;
        this.resolution = 20;
    }
    WaterFactory.prototype.newInstance = function (pixels) {
        var waterHeight = this.game.height - pixels;
        var waterPoints = this.createwaterPoints(this.resolution, waterHeight, this.k);
        this.createWater(waterPoints);
        return new water_1.Water(this.game, pixels, this.resolution, waterPoints);
    };
    WaterFactory.prototype.createwaterPoints = function (resolution, waterHeight, k) {
        var points = Array();
        var singleLength = this.game.width / resolution;
        for (var i = 0; i <= resolution; i++) {
            points.push(new water_point_1.WaterPoint(this.game, singleLength * i, waterHeight, waterHeight, k));
        }
        return points;
    };
    WaterFactory.prototype.createWater = function (waterPoints) {
        waterPoints.push(new Phaser.Point(this.game.width, this.game.height));
        waterPoints.push(new Phaser.Point(0, this.game.height));
    };
    return WaterFactory;
}());
exports.WaterFactory = WaterFactory;
//# sourceMappingURL=water-factory.js.map