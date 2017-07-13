import * as Phaser from "phaser-ce";

import { Water } from "./water";
import { WaterPoint } from "./water-point";

export class WaterFactory {

    private game: Phaser.Game;
    private k: number;
    private resolution: number;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.k = 0.025;
        this.resolution = 20;
    }

    public newInstance(pixels: number): Water {
        const waterHeight = this.game.height - pixels;
        const waterPoints = this.createwaterPoints(this.resolution, waterHeight, this.k);
        this.createWater(waterPoints);
        return new Water(this.game, pixels, this.resolution, waterPoints);
    }

    private createwaterPoints(resolution: number, waterHeight: number, k: number): WaterPoint[] {
        const points = Array<WaterPoint>();
        const singleLength = this.game.width / resolution;

        for (let i = 0; i <= resolution; i++) {
            points.push(new WaterPoint(this.game, singleLength * i, waterHeight, waterHeight, k));
        }
        return points;
    }

    private createWater(waterPoints: Phaser.Point[]): void {
        // Bug right here with references
        waterPoints.push(new Phaser.Point(this.game.width, this.game.height));
        waterPoints.push(new Phaser.Point(0, this.game.height));
    }
}
