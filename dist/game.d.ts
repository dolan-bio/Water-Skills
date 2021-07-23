import * as Phaser from "phaser-ce";
import { ISkillModel } from "./models/skill-model";
export declare class ExtendedGame extends Phaser.Game {
    stateLoadedCallback: () => void;
}
export declare class Game {
    private game;
    run(container: string, loadedCallback: () => void): void;
    setItemsArray(array: ISkillModel[]): void;
}
