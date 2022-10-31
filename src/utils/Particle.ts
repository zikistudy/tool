import { Rect } from "./Rect";
import { Vector } from "./Vector";
import { ExportedStage } from "./Stage";

export class Particle extends Rect {
  velocity: Vector;
  isFirstTime: boolean;
  mass: number;

  constructor(props: any) {
    super(props);
    this.velocity = props.velocity;
    this.isFirstTime = true;
    this.mass = props.mass;
  }

  applyForce = (force: Vector) => {
    this.velocity.add(force.clone().div(this.mass));
  };

  update = (stage: ExportedStage) => {
    if (!this.isFirstTime) {
      this.opacity -= 0.05;
      const { verticalAcceleration, horizontalVelocity } = stage;
      this.velocity.add(verticalAcceleration);
      this.position.add(Vector.add(this.velocity, horizontalVelocity));
      this.opacity = Math.max(this.opacity, 0);
    }
    this.isFirstTime = false;
  };
}
