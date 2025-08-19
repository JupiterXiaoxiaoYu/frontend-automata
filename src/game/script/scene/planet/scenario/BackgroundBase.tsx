import { CreatureAnimation } from "./CreatureAnimation";
import BackGround from "../../../../image/backgrounds/planet.png";

export class BackgroundBase {
  width: number;
  height: number;
  creatureAnimations: Array<CreatureAnimation>;
  context?: CanvasRenderingContext2D;
  backgroundImage: HTMLImageElement;

  constructor(
    width: number,
    height: number,
    context: CanvasRenderingContext2D,
    creatureAnimations: Array<CreatureAnimation>
  ) {
    this.width = width;
    this.height = height;
    this.creatureAnimations = creatureAnimations;
    this.backgroundImage = new Image();
    this.backgroundImage.src = BackGround;
    this.context = context;
  }

  draw(): void {
    /* */
  }
}
