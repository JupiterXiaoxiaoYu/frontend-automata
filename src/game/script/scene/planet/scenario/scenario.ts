import { CreatureAnimation } from "./CreatureAnimation";
import { BackgroundDisco } from "./BackgroundDisco";
import { BackgroundBase } from "./BackgroundBase";

export class Scenario {
  status: string;
  creatureAnimations: Array<CreatureAnimation>;
  focusingIndex?: number | null;
  hoveringIndex?: number | null;
  background: BackgroundBase;
  context: CanvasRenderingContext2D;
  ratio: number;

  constructor(width: number, height: number) {
    this.status = "play";
    this.creatureAnimations = [];
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d")!;
    this.context = context;
    this.ratio = width / 1920;
    this.background = new BackgroundDisco(
      width,
      height,
      context,
      this.creatureAnimations
    );
  }

  updateCreatureAnimations(creatureTypes: number[]) {
    for (let i = 0; i < this.creatureAnimations.length; i++) {
      if (this.creatureAnimations[i].creatureType != creatureTypes[i]) {
        this.creatureAnimations[i].updateCreatureType(creatureTypes[i]);
      }
    }

    for (
      let i = this.creatureAnimations.length;
      i < creatureTypes.length;
      i++
    ) {
      const creatureAnimation = new CreatureAnimation(
        i,
        creatureTypes[i],
        this.ratio
      );
      this.creatureAnimations.push(creatureAnimation);
    }
  }

  setFocus(index: number | null) {
    if (index != null && this.creatureAnimations.length <= index) return;

    if (this.focusingIndex != null) {
      this.creatureAnimations[this.focusingIndex].updateFocus(false);
    }
    if (index != null) {
      this.creatureAnimations[index].updateFocus(true);
    }
    this.focusingIndex = index;
  }

  getFirstCreatureInRect(cursorLeft: number, cursorTop: number): number | null {
    for (let i = 0; i < this.creatureAnimations.length; i++) {
      const creatureAnimation = this.creatureAnimations[i];
      if (creatureAnimation.inRect(cursorLeft, cursorTop)) {
        return i;
      }
    }
    return null;
  }

  draw(state: any) {
    if (this.context) {
      this.background.draw();
    }
  }

  step() {
    for (let i = 0; i < this.creatureAnimations.length; i++) {
      const obj = this.creatureAnimations[i];
      obj.incFrame();
    }
  }
}
