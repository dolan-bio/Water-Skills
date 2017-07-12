import * as Phaser from "phaser-ce";

import { ExtendedGame } from "../game";
import { ISkillModel } from "../models/skill-model";
import { SkillPill } from "../prefabs/skill-pill/skill-pill";
import { SkillPillFactory } from "../prefabs/skill-pill/skill-pill-factory";
import { Water } from "../prefabs/water/water";
import { WaterFactory } from "../prefabs/water/water-factory";
import { MouseDragHandler } from "./mouse-drag-handler";

export class ExtendedState extends Phaser.State {
    public game: ExtendedGame;
}

export interface IMainState extends ExtendedState {
    setItemsArray(array: ISkillModel[]): void;
    setWaterLevel(level?: number, delay?: number): void;
}

export class MainState extends ExtendedState {

    private graphics: Phaser.Graphics;
    private water: Water;
    private skillPillFactory: SkillPillFactory;
    private mouseDragHandler: MouseDragHandler;
    private skillPills: SkillPill[];

    private skillPillGroup: Phaser.Group;
    private waterGroup: Phaser.Group;

    constructor() {
        super();
        this.skillPills = new Array<SkillPill>();
    }

    public create(): void {
        this.skillPillGroup = new Phaser.Group(this.game);
        this.waterGroup = new Phaser.Group(this.game);
        this.waterGroup.z = 10;
        this.skillPillGroup.z = 1;

        this.setUpPhysics();

        const waterFactory = new WaterFactory(this.game);
        this.water = waterFactory.newInstance(0.5);
        // this.waterGroup.add(this.water);

        this.game.stage.backgroundColor = 0xF5F5F5;
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.tweens.frameBased = true;

        this.graphics = this.game.add.graphics(0, 0);

        this.skillPillFactory = new SkillPillFactory(this.game);

        this.game.scale.onSizeChange.add(() => {
            this.water.setLevel();
        });

        this.mouseDragHandler = new MouseDragHandler(this.game);
        this.game.stateLoadedCallback();
    }

    public update(): void {
        this.graphics.clear();
        this.water.update(this.graphics);
        this.graphics.endFill();

        this.skillPills.forEach((skillPill) => {
            skillPill.updatePhysics(this.water.getWaterLevel(skillPill.position.x), this.water);
        });
    }

    public setWaterLevel(level?: number, delay?: number): void {
        this.water.setLevel(level, delay);
    }

    public setItemsArray(array: ISkillModel[]): void {
        array.forEach((skill) => {
            const skillPill = this.skillPillFactory.newInstance(100, 100, skill, 100);
            this.game.add.existing(skillPill);
            this.mouseDragHandler.sprites.push(skillPill);
            this.skillPills.push(skillPill);
            this.skillPillGroup.add(skillPill);
        });
    }

    private setUpPhysics(): void {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0.3;
    }
}
