import * as Phaser from "phaser-ce";

export class WaterPoint extends Phaser.Point {
    public speed: number;

    constructor(private game: Phaser.Game, x: number, y: number, private targetHeight: number, private k: number) {
        super(x, y);
        this.speed = 0;
    }

    public update(dampening: number, tension: number): void {
        const deltaY = this.targetHeight - this.y;
        this.speed += tension * deltaY - this.speed * dampening;
        this.y += this.speed;
    }
}
