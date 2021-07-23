import * as Phaser from "phaser-ce";
import { Water } from "./water";
export declare class WaterFactory {
    private game;
    private k;
    private resolution;
    constructor(game: Phaser.Game);
    newInstance(pixels: number): Water;
    private createwaterPoints;
    private createWater;
}
