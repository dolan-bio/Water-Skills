namespace WaterSkillGame {
    export class ExtendedGame extends Phaser.Game {
        public stateLoadedCallback: Function;
    }

    export class Game {
        private game: ExtendedGame;
        private width: number;
        private height: number;

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
        }

        public run(container: string, loadedCallback: Function): void {
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            this.game = new ExtendedGame(this.width, this.height, Phaser.AUTO, container, WaterSkillGame.States.MainState);
            this.game.stateLoadedCallback = loadedCallback;
        }

        public setItemsArray(array: Array<Models.SkillModel>): void {
            let state = <States.IMainState> this.game.state.getCurrentState();
            if (state) {
                state.setItemsArray(array);
            }
        }

        public setWaterLevel(percentage: number, delay?: number): void {
            let state = <States.IMainState> this.game.state.getCurrentState();
            if (state) {
                state.setWaterLevel(percentage, delay);
            }
        }
    }
}
