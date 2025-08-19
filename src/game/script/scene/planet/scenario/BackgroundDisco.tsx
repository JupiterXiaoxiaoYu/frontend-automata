import { Clip } from "./meme";
import { WIDTH, HEIGHT } from "./draw";
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

    this.context.drawImage(this.backgroundImage, 0, 0, WIDTH, HEIGHT);

    for (const obj of this.clips) {
      obj.draw(this.context);
    }
  }
}
