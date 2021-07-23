import * as Phaser from "phaser-ce";
export declare class BuoyancyManager {
    private k;
    private viscosity;
    private liftForce;
    constructor(k?: number, viscosity?: number);
    applyAABBBuoyancyForces(body: Phaser.Physics.P2.Body, planePosition: Phaser.Point): void;
}
