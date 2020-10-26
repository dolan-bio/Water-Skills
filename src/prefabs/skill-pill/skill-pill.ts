import * as Phaser from "phaser-ce";

import { Water } from "../water/water";
import { BuoyancyManager } from "./buoyancy-manager";

const COLOR_PALATES = [
  ["#D496A7", "#9D695A", "#78E0DC", "#8EEDF7", "#A1CDF1"],
  ["#E89005", "#EC7505", "#D84A05", "#F42B03", "#E70E02"],
  ["#BCE784", "#5DD39E", "#348AA7", "#525174", "#513B56"],
  ["#0DAB76", "#139A43", "#0B5D1E", "#053B06", "#000000"],
  ["#75DDDD", "#508991", "#172A3A", "#004346", "#09BC8A"],
];

export class SkillPill extends Phaser.Text {
  private inWater: boolean;

  constructor(game: Phaser.Game, x: number, y: number, text: string, private buoyancyManager: BuoyancyManager) {
    super(game, x, y, text, {
      font: "14px 'Anonymous Pro'",
      fill: "white",
      backgroundColor: COLOR_PALATES[Math.floor(Math.random() * COLOR_PALATES.length)][Math.floor(Math.random() * COLOR_PALATES[0].length)],
      wordWrap: true,
      wordWrapWidth: 200,
    });

    this.inWater = false;
    this.game.physics.p2.enable(this);
    this.body.angularVelocity = Math.random() * 8 - 4;
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
