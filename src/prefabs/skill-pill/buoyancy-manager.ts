import * as Phaser from "phaser-ce";

// k = up force per submerged "volume"
export class BuoyancyManager {
    private liftForce: Phaser.Point = new Phaser.Point();

    constructor(private k: number = 100, private viscosity: number = 0.8) {
    }

    public applyAABBBuoyancyForces(body: Phaser.Physics.P2.Body, planePosition: Phaser.Point): void {
        let centerOfBuoyancy = new Phaser.Point();

        // Get shape AABB
        const bounds = body.sprite.getBounds();
        let areaUnderWater: number;

        if (bounds.y > planePosition.y) {
            // Fully submerged
            centerOfBuoyancy = body.sprite.position;
            areaUnderWater = body.sprite.width * body.sprite.height;
        } else if (bounds.y + bounds.height > planePosition.y) {
            // Partially submerged
            const width = bounds.width;
            const height = Math.abs(bounds.y - planePosition.y);
            // areaUnderWater = width * height;
            areaUnderWater = body.sprite.width * body.sprite.height;
            centerOfBuoyancy = body.sprite.position;
            // var ratioOutOfWater = (planePosition.y - bounds.y) / bounds.height;
            // centerOfBuoyancy.x = bounds.x + width / 2;
            // centerOfBuoyancy.y = bounds.y + (height / 2) + (height / 2 * ratioOutOfWater);
        } else {
            body.angularDamping = 0.1;
            return;
        }

        // Compute lift force
        this.liftForce = Phaser.Point.subtract(centerOfBuoyancy, planePosition);
        // this.liftForce.setMagnitude(areaUnderWater * this.k);

        // Make center of bouycancy relative to the body
        centerOfBuoyancy = Phaser.Point.subtract(centerOfBuoyancy, body.sprite.position);

        // Apply forces
        body.velocity.x = body.velocity.x * this.viscosity;
        body.velocity.y = body.velocity.y * this.viscosity;
        body.angularDamping = 0.9;
        // body.applyForce([this.viscousForce.x, this.viscousForce.y], centerOfBuoyancy.x, centerOfBuoyancy.y);
        if (this.liftForce.y > 0) {
            body.applyForce([0, this.liftForce.y], centerOfBuoyancy.x, centerOfBuoyancy.y);
        }
    }
}
