import { ISkillModel } from "../../models/skill-model";
import { BuoyancyManager } from "./buoyancy-manager";
import { SkillPill } from "./skill-pill";

export class SkillPillFactory {
  constructor(private game: Phaser.Game) {}

  public newInstance(x: number, y: number, skill: ISkillModel): SkillPill {
    const buoyancyManager = new BuoyancyManager(0.04, 0.9);
    const skillPill = new SkillPill(this.game, x, y, skill.message, buoyancyManager);
    return skillPill;
  }
}
