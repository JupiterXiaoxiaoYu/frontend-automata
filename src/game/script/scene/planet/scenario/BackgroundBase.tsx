import { Clip, ClipRect } from "./meme";
import BackGround from "../../../../image/backgrounds/planet.png";

export class BackgroundBase {
  clips: Array<Clip>;
  context?: CanvasRenderingContext2D;
  backgroundImage: HTMLImageElement;

  constructor(clips: Array<Clip>) {
    this.clips = clips;
    this.backgroundImage = new Image();
    this.backgroundImage.src = BackGround;
  }

  init(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw(): void {
    /* */
  }
}
