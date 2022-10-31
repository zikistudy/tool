import { Vector } from "./Vector";

export interface ExportedStage {
  width: number;
  height: number;
  verticalAcceleration: Vector;
  horizontalVelocity: Vector;
  ctx: CanvasRenderingContext2D;
}

export interface Props {
  verticalAcceleration: Vector;
  onResize: () => void;
  initialHorizontalVelocity: Vector;
  horizontalAcceleration: Vector;
}

interface Entity {
  update: (stage: ExportedStage) => void;
  draw: (stage: ExportedStage) => void;
}

export class Stage {
  ele: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width!: number;
  height!: number;
  raf!: number;
  verticalAcceleration: Vector;//垂直加速度
  initialHorizontalVelocity: Vector; //初始水平速度
  horizontalVelocity: Vector; //水平速度
  horizontalAcceleration: Vector; //水平加速度
  onResize: () => void;
  entities: Entity[] = [];

  constructor(props: Props) {
    this.ele = document.createElement("canvas");
    document.body.appendChild(this.ele);
    this.init();
    this.ctx = this.ele.getContext("2d")!;

    this.verticalAcceleration = props.verticalAcceleration;
    this.initialHorizontalVelocity = props.initialHorizontalVelocity;
    this.horizontalVelocity = props.initialHorizontalVelocity.clone();
    this.horizontalAcceleration = props.horizontalAcceleration;
    this.onResize = props.onResize ?? function () {};
    window.addEventListener("resize", this.handleResize, false);
  }

  handleResize = () => {
    this.init();
    this.onResize();
  };

  init() {
    const { devicePixelRatio, innerWidth, innerHeight } = window;
    this.ele.width = innerWidth * devicePixelRatio;
    this.ele.height = innerHeight * devicePixelRatio;
    this.width = innerWidth;
    this.height = innerHeight;
    this.ele.style.width = this.width + "px";
    this.ele.style.height = this.height + "px";
    this.ctx = this.ele.getContext("2d")!;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  tick = (callback:any) => {
    this.raf = requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.tick(callback);
    });

    const stage = {
      width: this.width,
      height: this.height,
      verticalAcceleration: this.verticalAcceleration,
      ctx: this.ctx,
      horizontalVelocity: this.horizontalVelocity
    };
    for (const entity of this.entities) {
      entity.update(stage);
    }
    callback?.();
    for (const entity of this.entities) {
      entity.draw(stage);
    }
    this.horizontalVelocity.add(this.horizontalAcceleration);
  };

  play = (callback:any) => {
    this.stop();
    this.tick(callback);
  };

  stop = () => {
    cancelAnimationFrame(this.raf);
  };

  add = (...entity: Entity[]) => {
    for (let i = 0; i < entity.length; i++) {
      this.entities.push(entity[i]);
    }
  };

  reset = () => {
    this.horizontalVelocity = this.initialHorizontalVelocity.clone();
    this.entities = [];
  };
}
