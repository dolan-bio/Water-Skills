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
exports.MainState = exports.ExtendedState = void 0;
var Phaser = require("phaser-ce");
var skill_pill_factory_1 = require("../prefabs/skill-pill/skill-pill-factory");
var water_factory_1 = require("../prefabs/water/water-factory");
var mouse_drag_handler_1 = require("./mouse-drag-handler");
var ExtendedState = (function (_super) {
    __extends(ExtendedState, _super);
    function ExtendedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExtendedState;
}(Phaser.State));
exports.ExtendedState = ExtendedState;
var MainState = (function (_super) {
    __extends(MainState, _super);
    function MainState() {
        return _super.call(this) || this;
    }
    MainState.prototype.create = function () {
        this.skillPillGroup = new Phaser.Group(this.game);
        this.setUpPhysics();
        var waterFactory = new water_factory_1.WaterFactory(this.game);
        this.water = waterFactory.newInstance(325);
        this.game.stage.backgroundColor = 0xf5f5f5;
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.tweens.frameBased = true;
        this.graphics = this.game.add.graphics(0, 0);
        this.skillPillFactory = new skill_pill_factory_1.SkillPillFactory(this.game);
        this.mouseDragHandler = new mouse_drag_handler_1.MouseDragHandler(this.game);
        this.game.stateLoadedCallback();
    };
    MainState.prototype.resize = function () {
        this.water.setHeight();
    };
    MainState.prototype.update = function () {
        var _this = this;
        this.graphics.clear();
        this.water.update();
        this.graphics.beginFill(0xffffff, 0.5);
        this.graphics.drawPolygon(this.water.points);
        this.graphics.endFill();
        this.skillPillGroup.children.forEach(function (skillPill) {
            skillPill.updatePhysics(_this.water.getWaterLevel(skillPill.position.x), _this.water);
        });
    };
    MainState.prototype.setItemsArray = function (array) {
        var _this = this;
        array.forEach(function (skill) {
            var skillPill = _this.skillPillFactory.newInstance(_this.randomIntFromInterval(100, _this.game.width - 100), 100, skill);
            _this.game.add.existing(skillPill);
            _this.mouseDragHandler.sprites.push(skillPill);
            _this.skillPillGroup.add(skillPill);
        });
    };
    MainState.prototype.setUpPhysics = function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0.3;
    };
    MainState.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return MainState;
}(ExtendedState));
exports.MainState = MainState;
//# sourceMappingURL=main.js.map