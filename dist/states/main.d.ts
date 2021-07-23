import * as Phaser from "phaser-ce";
import { ExtendedGame } from "../game";
import { ISkillModel } from "../models/skill-model";
export declare class ExtendedState extends Phaser.State {
    game: ExtendedGame;
}
export interface IMainState extends ExtendedState {
    setItemsArray(array: ISkillModel[]): void;
}
export declare class MainState extends ExtendedState {
    private graphics;
    private water;
    private skillPillFactory;
    private mouseDragHandler;
    private skillPillGroup;
    constructor();
    create(): void;
    resize(): void;
    update(): void;
    setItemsArray(array: ISkillModel[]): void;
    private setUpPhysics;
    private randomIntFromInterval;
}
