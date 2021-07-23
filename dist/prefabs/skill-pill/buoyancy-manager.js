"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuoyancyManager = void 0;
var Phaser = require("phaser-ce");
var BuoyancyManager = (function () {
    function BuoyancyManager(k, viscosity) {
        if (k === void 0) { k = 100; }
        if (viscosity === void 0) { viscosity = 0.8; }
        this.k = k;
        this.viscosity = viscosity;
        this.liftForce = new Phaser.Point();
    }
    BuoyancyManager.prototype.applyAABBBuoyancyForces = function (body, planePosition) {
        var centerOfBuoyancy = new Phaser.Point();
        var bounds = body.sprite.getBounds();
        var areaUnderWater;
        if (bounds.y > planePosition.y) {
            centerOfBuoyancy = body.sprite.position;
            areaUnderWater = body.sprite.width * body.sprite.height;
        }
        else if (bounds.y + bounds.height > planePosition.y) {
            var width = bounds.width;
            var height = Math.abs(bounds.y - planePosition.y);
            areaUnderWater = body.sprite.width * body.sprite.height;
            centerOfBuoyancy = body.sprite.position;
        }
        else {
            body.angularDamping = 0.1;
            return;
        }
        this.liftForce = Phaser.Point.subtract(centerOfBuoyancy, planePosition);
        centerOfBuoyancy = Phaser.Point.subtract(centerOfBuoyancy, body.sprite.position);
        body.velocity.x = body.velocity.x * this.viscosity;
        body.velocity.y = body.velocity.y * this.viscosity;
        body.angularDamping = 0.9;
        if (this.liftForce.y > 0) {
            body.applyForce([0, this.liftForce.y], centerOfBuoyancy.x, centerOfBuoyancy.y);
        }
    };
    return BuoyancyManager;
}());
exports.BuoyancyManager = BuoyancyManager;
//# sourceMappingURL=buoyancy-manager.js.map