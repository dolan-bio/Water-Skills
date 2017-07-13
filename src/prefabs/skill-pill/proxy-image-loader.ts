import * as Phaser from "phaser-ce";

export class ProxyImageLoader extends Phaser.Loader {

    constructor(game: Phaser.Game) {
        super(game);
    }

    public load(id: string, base64: string, callback: (key: string) => void): void {
        this.image(id, base64);
        this.onLoadComplete.addOnce(() => {
            callback(id);
        });
        this.start();
    }
}
