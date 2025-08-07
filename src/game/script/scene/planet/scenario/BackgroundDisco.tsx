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

    const sortedClips = this.clips.sort(
      (a, b) => a.getBottom() - b.getBottom()
    );
    for (const obj of sortedClips) {
      obj.draw(this.context);
    }
  }
}
