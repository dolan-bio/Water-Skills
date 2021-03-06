import * as Phaser from "phaser-ce";

export class MouseDragHandler extends p2.Body {
  public sprites: Phaser.Sprite[];
  private mouseConstraint: p2.Constraint;

  constructor(private game: Phaser.Game) {
    super();
    this.sprites = [];

    game.physics.p2.world.addBody(this);
    game.input.onDown.add(this.click, this);
    game.input.onUp.add(this.release, this);
    game.input.addMoveCallback(this.move, this);
  }

  private click(pointer: Phaser.Pointer): void {
    const bodies = this.game.physics.p2.hitTest(pointer.position, this.sprites);
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    const physicsPos = [this.game.physics.p2.pxmi(pointer.position.x), this.game.physics.p2.pxmi(pointer.position.y)];

    if (bodies.length) {
      const clickedBody = bodies[0];
      const localPointInBody = [0, 0];

      // this function takes physicsPos and coverts it to the body's local coordinate system
      clickedBody.toLocalFrame(localPointInBody, physicsPos);

      // use a revoluteContraint to attach mouseBody to the clicked body
      this.mouseConstraint = this.game.physics.p2.createRevoluteConstraint(this, [0, 0], clickedBody, [
        this.game.physics.p2.mpxi(localPointInBody[0]),
        this.game.physics.p2.mpxi(localPointInBody[1]),
      ]);
    }
  }

  private release(): void {
    // remove constraint from object's body
    this.game.physics.p2.removeConstraint(this.mouseConstraint);
  }

  private move(pointer: Phaser.Pointer): void {
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    this.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
    this.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
  }
}
