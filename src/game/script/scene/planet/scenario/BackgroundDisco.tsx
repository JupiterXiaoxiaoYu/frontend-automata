import { Clip } from "./meme";
import { drawBackground, FixedLight, WIDTH, Beat, HEIGHT } from "./draw";
import { BackgroundBase } from "./BackgroundBase";

export class BackgroundDisco extends BackgroundBase {
  constructor(clips: Array<Clip>) {
    super(clips);
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground(this.context);

    for (const obj of this.clips) {
      obj.draw(this.context);
    }
  }
}
