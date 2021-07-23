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
exports.SkillPill = void 0;
var Phaser = require("phaser-ce");
var COLOR_PALATES = [
    ["#D496A7", "#9D695A", "#78E0DC", "#8EEDF7", "#A1CDF1"],
    ["#E89005", "#EC7505", "#D84A05", "#F42B03", "#E70E02"],
    ["#BCE784", "#5DD39E", "#348AA7", "#525174", "#513B56"],
    ["#0DAB76", "#139A43", "#0B5D1E", "#053B06", "#000000"],
    ["#75DDDD", "#508991", "#172A3A", "#004346", "#09BC8A"],
];
var SkillPill = (function (_super) {
    __extends(SkillPill, _super);
    function SkillPill(game, x, y, text, buoyancyManager) {
        var _this = _super.call(this, game, x, y, text, {
            font: "14px 'Anonymous Pro'",
            fill: "white",
            backgroundColor: COLOR_PALATES[Math.floor(Math.random() * COLOR_PALATES.length)][Math.floor(Math.random() * COLOR_PALATES[0].length)],
            wordWrap: true,
            wordWrapWidth: 200,
        }) || this;
        _this.buoyancyManager = buoyancyManager;
        _this.inWater = false;
        _this.game.physics.p2.enable(_this);
        _this.body.angularVelocity = Math.random() * 8 - 4;
        return _this;
    }
    SkillPill.prototype.updatePhysics = function (point, water) {
        if (point) {
            this.buoyancyManager.applyAABBBuoyancyForces(this.body, point);
        }
        var waterLevel = this.game.height - water.Height;
        if (this.y > waterLevel && !this.inWater) {
            water.splash(this.x, this.body.velocity.y / 10);
        }
        if (this.y < waterLevel && this.inWater) {
            water.splash(this.x, this.body.velocity.y / 10);
        }
        this.inWater = this.y > waterLevel ? true : false;
    };
    return SkillPill;
}(Phaser.Text));
exports.SkillPill = SkillPill;
//# sourceMappingURL=skill-pill.js.map