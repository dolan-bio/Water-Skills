/// <reference types="phaser-ce" />
import { ISkillModel } from "../../models/skill-model";
import { SkillPill } from "./skill-pill";
export declare class SkillPillFactory {
    private game;
    constructor(game: Phaser.Game);
    newInstance(x: number, y: number, skill: ISkillModel): SkillPill;
}
