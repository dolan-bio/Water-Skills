import * as Phaser from "phaser-ce";
export declare class WaterPoint extends Phaser.Point {
    private game;
    private targetHeight;
    private k;
    speed: number;
    constructor(game: Phaser.Game, x: number, y: number, targetHeight: number, k: number);
    update(dampening: number, tension: number): void;
    setHeight(height: number): void;
}
