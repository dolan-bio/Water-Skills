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
exports.MouseDragHandler = void 0;
var MouseDragHandler = (function (_super) {
    __extends(MouseDragHandler, _super);
    function MouseDragHandler(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.sprites = [];
        game.physics.p2.world.addBody(_this);
        game.input.onDown.add(_this.click, _this);
        game.input.onUp.add(_this.release, _this);
        game.input.addMoveCallback(_this.move, _this);
        return _this;
    }
    MouseDragHandler.prototype.click = function (pointer) {
        var bodies = this.game.physics.p2.hitTest(pointer.position, this.sprites);
        var physicsPos = [this.game.physics.p2.pxmi(pointer.position.x), this.game.physics.p2.pxmi(pointer.position.y)];
        if (bodies.length) {
            var clickedBody = bodies[0];
            var localPointInBody = [0, 0];
            clickedBody.toLocalFrame(localPointInBody, physicsPos);
            this.mouseConstraint = this.game.physics.p2.createRevoluteConstraint(this, [0, 0], clickedBody, [
                this.game.physics.p2.mpxi(localPointInBody[0]),
                this.game.physics.p2.mpxi(localPointInBody[1]),
            ]);
        }
    };
    MouseDragHandler.prototype.release = function () {
        this.game.physics.p2.removeConstraint(this.mouseConstraint);
    };
    MouseDragHandler.prototype.move = function (pointer) {
        this.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
        this.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
    };
    return MouseDragHandler;
}(p2.Body));
exports.MouseDragHandler = MouseDragHandler;
//# sourceMappingURL=mouse-drag-handler.js.map