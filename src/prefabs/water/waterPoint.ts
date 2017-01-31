namespace WaterSkillGame.Prefabs {
     export class WaterPoint extends Phaser.Point {
        private k: number;
        private game: Phaser.Game;

        public targetHeight: number;
        public speed: number;

        constructor(game: Phaser.Game, x: number, y: number, targetHeight: number, k: number) {
            super(x, y);
            this.targetHeight = targetHeight;
            this.k = k;
            this.game = game;
            this.speed = 0;
        }

        update(dampening: number, tension: number) {
            let deltaY = this.targetHeight - this.y;
            this.speed += tension * deltaY - this.speed * dampening;
            this.y += this.speed;
        }
    }
}