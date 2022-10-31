import { Rect } from "./Rect";
import { ExportedStage } from "./Stage";
import { Vector } from "./Vector";

export class Platform extends Rect {
  prevPosition!: Vector;

  update(stage: ExportedStage) {
    const { horizontalVelocity } = stage;
    this.prevPosition = this.position.clone();
    this.position.add(horizontalVelocity);
  }
}
