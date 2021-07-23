import * as Phaser from "phaser-ce";
export declare class MouseDragHandler extends p2.Body {
    private game;
    sprites: Phaser.Sprite[];
    private mouseConstraint;
    constructor(game: Phaser.Game);
    private click;
    private release;
    private move;
}
