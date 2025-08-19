import { Clip, createAnimationClip } from "./meme";
import { HEIGHT, WIDTH } from "./draw";
import { BackgroundDisco } from "./BackgroundDisco";
import { BackgroundBase } from "./BackgroundBase";

export class Scenario {
  status: string;
  clips: Array<Clip>;
  focusingIndex?: number | null;
  background: BackgroundBase;
  context?: CanvasRenderingContext2D;
  onSelectCreature: (index: number) => void;

  constructor(onSelectCreature: (index: number) => void) {
    this.status = "play";
    this.clips = [];
    this.background = new BackgroundDisco(this.clips);
    this.onSelectCreature = onSelectCreature;
  }

  updateClips(creatureTypes: number[]) {
    for (let i = 0; i < this.clips.length; i++) {
      if (this.clips[i].creatureType != creatureTypes[i]) {
        this.clips[i].updateCreatureType(creatureTypes[i]);
      }
    }

    for (let i = this.clips.length; i < creatureTypes.length; i++) {
      const clip = createAnimationClip(i, creatureTypes[i]);
      this.clips.push(clip);
    }
  }

  setFocus(index: number) {
    if (this.focusingIndex != null) {
      this.clips[this.focusingIndex].focus = false;
    }
    this.clips[index].focus = true;
    this.focusingIndex = index;
  }

  selectMeme(cursorLeft: number, cursorTop: number) {
    for (let i = 0; i < this.clips.length; i++) {
      const clip = this.clips[i];
      if (clip.inRect(cursorLeft, cursorTop)) {
        this.onSelectCreature(i);
      }
    }
  }

  hoverMeme(cursorLeft: number, cursorTop: number) {
    let picked = false;
    for (const clip of this.clips) {
      if (picked) {
        clip.hover = false;
        picked = true;
      } else if (clip.inRect(cursorLeft, cursorTop)) {
        clip.hover = true;
      } else {
        clip.hover = false;
      }
    }
  }

  init() {
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const context = canvas.getContext("2d")!;
    this.context = context;
    this.background.init(context);
  }

  draw(state: any) {
    if (this.context) {
      this.background.draw();
    }
  }

  step() {
    for (let i = 0; i < this.clips.length; i++) {
      const obj = this.clips[i];
      obj.incFrame();
    }
  }
}
