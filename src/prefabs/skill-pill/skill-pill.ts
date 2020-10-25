import * as Phaser from "phaser-ce";

import { Water } from "../water/water";
import { BuoyancyManager } from "./buoyancy-manager";

export class SkillPill extends Phaser.Text {
    private inWater: boolean;

    constructor(game: Phaser.Game, x: number, y: number, text: string, private buoyancyManager: BuoyancyManager) {
        super(game, x, y, text, {
            fill: "white",
            backgroundColor: "#000",
        });

        this.inWater = false;
        this.game.physics.p2.enable(this);
        this.body.angularVelocity = (Math.random() * 8) - 4;
    }

    public updatePhysics(point: Phaser.Point, water: Water): void {
        if (point) {
            this.buoyancyManager.applyAABBBuoyancyForces(this.body, point);
        }

        const waterLevel = this.game.height - water.Height;

        if (this.y > waterLevel && !this.inWater) {
            water.splash(this.x, this.body.velocity.y / 10);
        }

        if (this.y < waterLevel && this.inWater) {
            water.splash(this.x, this.body.velocity.y / 10);
        }

        this.inWater = this.y > waterLevel ? true : false;
    }
}
