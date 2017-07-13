import * as Phaser from "phaser-ce";

import { ISkillModel } from "./models/skill-model";
import { IMainState, MainState } from "./states/main";

export class ExtendedGame extends Phaser.Game {
    public stateLoadedCallback: () => void;
}

export class Game {
    private game: ExtendedGame;
    private width: number;
    private height: number;

    public run(container: string, loadedCallback: () => void): void {
        // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
        this.game = new ExtendedGame(this.width, this.height, Phaser.AUTO, container, MainState, true);
        this.game.stateLoadedCallback = loadedCallback;
    }

    public setItemsArray(array: ISkillModel[]): void {
        const state = this.game.state.getCurrentState() as IMainState;
        if (state) {
            state.setItemsArray(array);
        }
    }

    public setWaterLevel(percentage: number, delay?: number): void {
        const state = this.game.state.getCurrentState() as IMainState;
        if (state) {
            state.setWaterLevel(percentage, delay);
        }
    }
}
