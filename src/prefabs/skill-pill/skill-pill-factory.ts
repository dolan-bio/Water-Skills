import { ISkillModel } from "../../models/skill-model";
import { BuoyancyManager } from "./buoyancy-manager";
import { ProxyImageLoader } from "./proxy-image-loader";
import { SkillPill } from "./skill-pill";

export class SkillPillFactory {

    private game: Phaser.Game;
    private imageLoader: ProxyImageLoader;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.imageLoader = new ProxyImageLoader(game);
    }

    public newInstance(x: number, y: number, skill: ISkillModel, size: number): SkillPill {
        const buoyancyManager = new BuoyancyManager(0.04, 0.9);
        const skillPill = new SkillPill(this.game, x, y, buoyancyManager);
        this.imageLoader.load(skill.name, skill.image, (key) => {
            skillPill.loadTexture(key);
            skillPill.scale.setTo(size / skillPill.width);
            skillPill.body.setRectangleFromSprite(skillPill);
        });
        return skillPill;
    }
}
