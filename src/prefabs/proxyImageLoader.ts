namespace WaterSkillGame.Prefabs {
    export class ProxyImageLoader extends Phaser.Loader {

        constructor(game: Phaser.Game) {
            super(game);
        }

        public load(key: string, callback: (key: string) => void): void {
            this.image(key, "/api/proxy/images/" + this.normaliseKey(key), false);
            this.onLoadComplete.addOnce(() => {
                callback(key);
            });
            this.start();
        }

        private normaliseKey(key: string): string {
            return key.replace("#", "sharp");
        }
    }
}
