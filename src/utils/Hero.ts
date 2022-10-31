import { Rect, Props as RectProps } from "./Rect";
import { ExportedStage } from "./Stage";
import { Vector } from "./Vector";

interface Props extends RectProps {
  mass?: number;
  velocity?: Vector;
}

export class Hero extends Rect {
  mass: number;
  velocity: Vector;
  prevPosition: Vector | undefined;
  prevVelocity: Vector | undefined;
  maxConJump: number;
  curConJump: number;

  constructor(props: Props) {
    super(props);
    this.mass = props.mass ?? 1;
    this.velocity = props.velocity ?? new Vector();
    this.maxConJump = 2;
    this.curConJump = 999;
  }

  update(stage: ExportedStage) {
    const { verticalAcceleration } = stage;
    this.prevPosition = this.position.clone();
    this.prevVelocity = this.velocity.clone();
    this.velocity.add(verticalAcceleration);
    this.position.add(
      Vector.sub(this.velocity, verticalAcceleration.clone().mult(0.5))
    );
  }

  applyForce = (force: Vector) => {
    this.velocity.add(force.clone().div(this.mass));
  };

  jump = () => {
    if (this.curConJump < this.maxConJump) {
      this.velocity = new Vector();
      this.applyForce?.(new Vector(0, -12));
      this.curConJump++;
    } else if (this.curConJump === this.maxConJump) {
      this.velocity.add(new Vector(0, 30));
      this.curConJump++;
    }
  };
}
