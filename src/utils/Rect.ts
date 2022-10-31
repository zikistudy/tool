import { Vector } from "./Vector";

export interface Props {
  position: Vector;
  width: number;
  height: number;
  color: string;
  opacity?: number;
}

export class Rect {
  // x, y 为左上角坐标
  position: Vector;
  width: number;
  height: number;
  color: string;
  opacity: number;

  constructor(props: Props) {
    this.position = props.position;
    this.width = props.width;
    this.height = props.height;
    this.color = props.color;
    this.opacity = props.opacity ?? 1;
  }

  // 判断两个矩形是否相交
  static isIntersect(r1: Rect, r2: Rect): boolean {
    return !(
      r2.position.x > r1.position.x + r1.width ||
      r2.position.x + r2.width < r1.position.x ||
      r2.position.y > r1.position.y + r1.height ||
      r2.position.y + r2.height < r1.position.y
    );
  }

  draw = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.restore();
  };
}
