import { Clip, createAnimationClip } from "./meme";
import { HEIGHT, WIDTH, Beat } from "./draw";
import { BackgroundDisco } from "./BackgroundDisco";
import { BackgroundBase, ShapeProps } from "./BackgroundBase";
import { ProgramType } from "../../../../../data/models";

function getRandomNumber(range: number): number {
  return Math.floor(Math.random() * range);
}

export class Scenario {
  status: string;
  clips: Array<Clip>;
  focusingIndex?: number | null;
  background: BackgroundBase;
  context?: CanvasRenderingContext2D;

  constructor() {
    this.status = "play";
    this.clips = [];
    this.background = new BackgroundDisco(this.clips);
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
        this.setFocus(i);
        return clip.index;
      }
    }
    return null;
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

  cicleClips() {
    let j = 0;
    const factor = (Math.PI * 2) / (this.clips.length - 1);
    for (let i = 0; i < this.clips.length; i++) {
      if (this.focusingIndex !== i) {
        const x = 300 * Math.sin(j * factor);
        const y = 50 * Math.cos(j * factor);
        this.clips[i].target = [[450 + x, 300 + y]];
        j++;
      }
    }
  }

  waveClips() {
    for (let i = 0; i < this.clips.length; i++) {
      if (this.focusingIndex !== i) {
        this.clips[i].target = [
          [150 + 60 * i, 300 + 30 * Math.cos(((i + 1) * Math.PI) / 3)],
        ];
      }
    }
  }

  lineClips() {
    const mid = this.clips.length / 2;
    for (let i = 0; i < mid; i++) {
      if (this.focusingIndex !== i) {
        this.clips[i].target = [[370 - 40 * i, 300 + 20 * (i - 3)]];
      }
    }
    for (let i = mid; i < this.clips.length; i++) {
      if (this.focusingIndex !== i) {
        this.clips[i].target = [[370 + 40 * i, 300 + 20 * (i - 3 - mid)]];
      }
    }
  }

  focusActor(left: number, top: number, move: number) {
    if (move == 2) {
      this.waveClips();
    } else if (move == 3) {
      this.cicleClips();
    } else if (move == 4) {
      this.lineClips();
    }
    if (this.focusingIndex) {
      this.clips[this.focusingIndex].target = [[left, top]];
    }
  }

  clearTargets() {
    for (let i = 0; i < this.clips.length; i++) {
      this.clips[i].target = [];
    }
  }

  restoreActor() {
    for (let i = 0; i < this.clips.length; i++) {
      const top = 240 + getRandomNumber(80);
      const left = 50 + getRandomNumber(800);
      this.clips[i].target = [[left, top]];
    }
    setTimeout(() => {
      this.clearTargets();
    }, 3000);
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
