import * as Phaser from "phaser-ce";

export class WaterPoint extends Phaser.Point {
    public targetHeight: number;
    public speed: number;

    private k: number;
    private game: Phaser.Game;

    constructor(game: Phaser.Game, x: number, y: number, targetHeight: number, k: number) {
        super(x, y);
        this.targetHeight = targetHeight;
        this.k = k;
        this.game = game;
        this.speed = 0;
    }

    public update(dampening: number, tension: number): void {
        const deltaY = this.targetHeight - this.y;
        this.speed += tension * deltaY - this.speed * dampening;
        this.y += this.speed;
    }

    public setLevel(height: number, delay: number, callback: () => void): void {

    }
}
