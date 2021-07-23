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
exports.Game = exports.ExtendedGame = void 0;
var Phaser = require("phaser-ce");
var main_1 = require("./states/main");
var ExtendedGame = (function (_super) {
    __extends(ExtendedGame, _super);
    function ExtendedGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExtendedGame;
}(Phaser.Game));
exports.ExtendedGame = ExtendedGame;
var Game = (function () {
    function Game() {
    }
    Game.prototype.run = function (container, loadedCallback) {
        this.game = new ExtendedGame(undefined, undefined, Phaser.AUTO, container, main_1.MainState, true);
        this.game.stateLoadedCallback = loadedCallback;
    };
    Game.prototype.setItemsArray = function (array) {
        var state = this.game.state.getCurrentState();
        if (state) {
            state.setItemsArray(array);
        }
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map