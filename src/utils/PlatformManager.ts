import { Platform } from "./Platform";
import { ExportedStage } from "./Stage";
import { random, randomOne } from "./utils";
import { Vector } from "./Vector";

interface Props {
  colors: string[];
}

export class PlatformManager {
  platforms: Platform[];
  colors: string[];
  lastPlatform: Platform;

  constructor(props: Props) {
    const { colors } = props;
    this.colors = colors;
    this.platforms = [];
    this.lastPlatform = null!;
  }

  static getRandomProperties(stage: ExportedStage) {
    const width = random(80, 680);
    const height = random(50, 200);
    const gap = random(
      (80 * Math.abs(stage.horizontalVelocity.x)) / 3,
      (180 * Math.abs(stage.horizontalVelocity.x)) / 3
    );

    return {
      width,
      height,
      gap
    };
  }

  update = (stage: ExportedStage) => {
    while (
      !this.platforms.length ||
      this.lastPlatform.position.x < stage.width
    ) {
      const { width, height, gap } = PlatformManager.getRandomProperties(stage);
      let prev = !this.platforms.length
        ? 0
        : this.lastPlatform.position.x + this.lastPlatform.width + gap;
      const newPlatform = new Platform({
        position: new Vector(prev, stage.height - height),
        width: !this.platforms.length
          ? random(stage.width * 0.8, stage.width)
          : width,
        height,
        color: randomOne(this.colors)
      });
      this.lastPlatform = newPlatform;
      this.platforms.push(newPlatform);
    }

    for (let i = 0; i < this.platforms.length; i++) {
      const platform = this.platforms[i];
      platform.update(stage);

      // 如果已经走过屏幕左边
      if (platform.position.x + platform.width < 0) {
        const { width, height, gap } = PlatformManager.getRandomProperties(
          stage
        );

        platform.position = new Vector(
          this.lastPlatform.position.x + this.lastPlatform.width + gap,
          stage.height - height
        );
        platform.color = randomOne(this.colors);
        platform.width = width;
        platform.height = height;
        this.lastPlatform = platform;
      }
    }
  };

  draw = (stage:any) => {
    this.platforms.forEach((p) => p.draw(stage));
  };
}
