import * as Phaser from "phaser-ce";
import { Water } from "../water/water";
import { BuoyancyManager } from "./buoyancy-manager";
export declare class SkillPill extends Phaser.Text {
    private buoyancyManager;
    private inWater;
    constructor(game: Phaser.Game, x: number, y: number, text: string, buoyancyManager: BuoyancyManager);
    updatePhysics(point: Phaser.Point, water: Water): void;
}
