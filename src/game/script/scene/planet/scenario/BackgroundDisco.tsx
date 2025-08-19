import { CreatureAnimation } from "./CreatureAnimation";
import { BackgroundBase } from "./BackgroundBase";

export class BackgroundDisco extends BackgroundBase {
  constructor(
    width: number,
    height: number,
    context: CanvasRenderingContext2D,
    creatureAnimations: Array<CreatureAnimation>
  ) {
    super(width, height, context, creatureAnimations);
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.drawImage(this.backgroundImage, 0, 0, this.width, this.height);

    for (const obj of this.creatureAnimations) {
      obj.draw(this.context);
    }
  }
}
