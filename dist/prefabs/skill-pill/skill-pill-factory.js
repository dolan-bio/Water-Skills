"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillPillFactory = void 0;
var buoyancy_manager_1 = require("./buoyancy-manager");
var skill_pill_1 = require("./skill-pill");
var SkillPillFactory = (function () {
    function SkillPillFactory(game) {
        this.game = game;
    }
    SkillPillFactory.prototype.newInstance = function (x, y, skill) {
        var buoyancyManager = new buoyancy_manager_1.BuoyancyManager(0.04, 0.9);
        var skillPill = new skill_pill_1.SkillPill(this.game, x, y, skill.message, buoyancyManager);
        return skillPill;
    };
    return SkillPillFactory;
}());
exports.SkillPillFactory = SkillPillFactory;
//# sourceMappingURL=skill-pill-factory.js.map