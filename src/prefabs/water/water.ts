import * as Phaser from "phaser-ce";

import { WaterPoint } from "./water-point";

export class Water extends Phaser.Polygon {

    private passThroughs: number;
    private spread: number;

    constructor(private game: Phaser.Game, private level: number, private resolution: number, points: Phaser.Point[], private waterPoints: WaterPoint[]) {
        super(points);
        this.passThroughs = 1;
        this.spread = 0.25;

        this.game.physics.p2.enable(this);
    }

    public update(...graphicsCollection: Phaser.Graphics[]): void {
        for (let i = 0; i < this.waterPoints.length - 2; i++) {
            this.waterPoints[i].update(0.025, 0.025);
        }

        const leftDeltas = Array<number>();
        const rightDeltas = Array<number>();

        // do some passes where this.waterPoints pull on their neighbours
        for (let j = 0; j < this.passThroughs; j++) {
            for (let i = 0; i < this.waterPoints.length - 2; i++) {
                if (i > 0) {
                    leftDeltas[i] = this.spread * (this.waterPoints[i].y - this.waterPoints[i - 1].y);
                    this.waterPoints[i - 1].speed += leftDeltas[i];
                }
                if (i < this.waterPoints.length - 1) {
                    rightDeltas[i] = this.spread * (this.waterPoints[i].y - this.waterPoints[i + 1].y);
                    this.waterPoints[i + 1].speed += rightDeltas[i];
                }
            }

            for (let i = 0; i < this.waterPoints.length - 2; i++) {
                if (i > 0) {
                    this.waterPoints[i - 1].y += leftDeltas[i];
                } else if (i < this.waterPoints.length - 1) {
                    this.waterPoints[i + 1].y += rightDeltas[i];
                }
            }
        }

        this.fixWaterPositions();

        graphicsCollection.forEach((graphics) => {
            graphics.beginFill(0x4da6ff, 0.5);
            this.points = this.waterPoints;
            graphics.drawPolygon(this.points);
        });
    }

    public splash(position: number, speed: number): void {
        const singleLength = this.game.width / this.resolution;
        const index = Math.round(position / singleLength);
        if (index >= 0 && index < this.waterPoints.length) {
            this.waterPoints[index].speed = speed;
        }
    }

    public setLevel(percentage?: number, delay?: number, callback?: () => void): void {
        if (delay !== undefined) {
            delay = Phaser.Timer.SECOND * 2;
        }
        if (percentage !== undefined) {
            this.level = percentage;
        }
    }

    public getWaterLevel(position: number): Phaser.Point {
        const singleLength = this.game.width / this.resolution;
        const index = Math.round(position / singleLength);
        if (index >= this.waterPoints.length || index < 0) {
            return new Phaser.Point(0, this.waterPoints[0].y);
        }
        return new Phaser.Point(0, this.waterPoints[index].y);
    }

    private fixWaterPositions(): void {
        const singleLength = this.game.width / this.resolution;
        for (let i = 0; i <= this.waterPoints.length - 3; i++) {
            this.waterPoints[i].x = singleLength * i;
        }

        this.waterPoints[this.waterPoints.length - 2].x = this.game.width;
        this.waterPoints[this.waterPoints.length - 2].y = this.game.height;

        this.waterPoints[this.waterPoints.length - 1].y = this.game.height;
    }

    private calculateWaterHeight(): number {
        return this.game.height - (this.game.height * this.level);
    }
}
