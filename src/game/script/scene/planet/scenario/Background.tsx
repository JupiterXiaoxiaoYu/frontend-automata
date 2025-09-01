import { CreatureAnimation } from "./CreatureAnimation";
import background_1 from "../../../../image/backgrounds/planet.png";
import background_2 from "../../../../image/backgrounds/planet2.png";

export const CREATURE_PER_BACKGROUND = 8;
const backgrounds = [background_1, background_2, background_2];
export const newCreaturePositions = [
  { x: 45, y: 50 },
  { x: 45, y: 50 },
  { x: 45, y: 50 },
];

export class Background {
  width: number;
  height: number;
  creatureAnimations: Array<CreatureAnimation>;
  context?: CanvasRenderingContext2D;
  backgroundIndex: number;
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
    this.backgroundIndex = 0;
    this.backgroundImage = new Image();
    this.backgroundImage.src = backgrounds[0];
    this.context = context;
  }

  updateBackground(index: number): void {
    this.backgroundIndex = index;
    this.backgroundImage.src = backgrounds[index];
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.backgroundImage, 0, 0, this.width, this.height);

    for (
      let i = this.backgroundIndex * CREATURE_PER_BACKGROUND;
      i < (this.backgroundIndex + 1) * CREATURE_PER_BACKGROUND;
      i++
    ) {
      const obj = this.creatureAnimations[i];
      if (obj) {
        obj.draw(this.context);
      }
    }
  }
}
