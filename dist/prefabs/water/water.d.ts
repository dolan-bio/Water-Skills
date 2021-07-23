import * as Phaser from "phaser-ce";
import { WaterPoint } from "./water-point";
export declare class Water extends Phaser.Polygon {
    private game;
    private pixels;
    private resolution;
    private waterPoints;
    private passThroughs;
    private spread;
    constructor(game: Phaser.Game, pixels: number, resolution: number, waterPoints: WaterPoint[]);
    update(): void;
    splash(position: number, speed: number): void;
    setHeight(): void;
    getWaterLevel(position: number): Phaser.Point;
    get Height(): number;
    private applyPhysics;
    private fixWaterPositions;
    private anchorBottomPoints;
}
