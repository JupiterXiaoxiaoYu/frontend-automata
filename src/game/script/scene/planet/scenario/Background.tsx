import { CreatureAnimation } from "./CreatureAnimation";
import background_1 from "../../../../image/backgrounds/planet.png";
import background_2 from "../../../../image/backgrounds/planet2.png";
import CreatureNewPlanet1Button, {
  Props as Planet1Props,
} from "../../../../components/Buttons/CreatureNewPlanet1Button";
import CreatureNewPlanet2Button, {
  Props as Planet2Props,
} from "../../../../components/Buttons/CreatureNewPlanet2Button";

export const CREATURE_PER_BACKGROUND = 8;

export const planetDatas = [
  {
    background: background_1,
    newCreatureButtonPosition: { x: 45, y: 50 },
    getComponent: ({ isDisabled, onClick }: Planet1Props) => (
      <CreatureNewPlanet1Button isDisabled={isDisabled} onClick={onClick} />
    ),
  },
  {
    background: background_2,
    newCreatureButtonPosition: { x: 47, y: 65 },
    getComponent: ({ isDisabled, onClick }: Planet2Props) => (
      <CreatureNewPlanet2Button isDisabled={isDisabled} onClick={onClick} />
    ),
  },
  {
    background: background_1,
    newCreatureButtonPosition: { x: 45, y: 50 },
    getComponent: ({ isDisabled, onClick }: Planet2Props) => (
      <CreatureNewPlanet2Button isDisabled={isDisabled} onClick={onClick} />
    ),
  },
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
    this.backgroundImage.src = planetDatas[0].background;
    this.context = context;
  }

  updateBackground(index: number): void {
    this.backgroundIndex = index;
    this.backgroundImage.src = planetDatas[index].background;
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
