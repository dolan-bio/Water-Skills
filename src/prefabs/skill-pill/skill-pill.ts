import * as Phaser from "phaser-ce";

import { Water } from "../water/water";
import { BuoyancyManager } from "./buoyancy-manager";

export class SkillPill extends Phaser.Sprite {
    private inWater: boolean;

    constructor(game: Phaser.Game, x: number, y: number, private buoyancyManager: BuoyancyManager) {
        super(game, x, y);

        this.inWater = false;
        this.game.physics.p2.enable(this);
        this.body.angularVelocity = (Math.random() * 8) - 4;
    }

    public updatePhysics(point: Phaser.Point, water: Water): void {
        if (point) {
            this.buoyancyManager.applyAABBBuoyancyForces(this.body, point);
        }

        if (this.y > this.game.height / 2 && !this.inWater) {
            water.splash(this.x, this.body.velocity.y / 10);
        }

        if (this.y < this.game.height / 2 && this.inWater) {
            water.splash(this.x, this.body.velocity.y / 10);
        }

        this.inWater = this.y > this.game.height / 2 ? true : false;
    }
}
