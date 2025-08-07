import { Clip, createAnimationClip } from "./meme";
import { HEIGHT, WIDTH, Beat } from "./draw";
import { ShapeBuilder } from "./ShapeBuilder";
import { BackgroundDisco } from "./BackgroundDisco";
import { BackgroundBase, ShapeProps } from "./BackgroundBase";

function getRandomNumber(range: number): number {
  return Math.floor(Math.random() * range);
}

export interface CreatureData {
  index: number;
  avatar: string;
  spriteSheet: string;
}

export class Scenario {
  status: string;
  clips: Array<Clip>;
  actor: Clip;
  actorState: "focus" | "restore";
  background: BackgroundBase;
  context?: CanvasRenderingContext2D;

  constructor(currentCreatures: CreatureData[]) {
    this.status = "play";
    this.clips = [];
    for (let i = 0; i < currentCreatures.length; i++) {
      const clip = createAnimationClip(
        i,
        currentCreatures[i].spriteSheet,
        220 + getRandomNumber(80),
        50 + getRandomNumber(800),
        (i * 2) % 24
      );
      this.clips.push(clip);
      clip.name = currentCreatures[i].index.toString();
    }
    this.clips[0].focus = true;
    this.actor = this.clips[0];
    this.actorState = "restore";

    this.background = new BackgroundDisco(this.clips);
  }

  selectMeme(cursorLeft: number, cursorTop: number) {
    const clips = this.clips.sort((a, b) => b.getBottom() - a.getBottom()); // front first
    for (const clip of clips) {
      if (clip.inRect(cursorLeft, cursorTop)) {
        this.actor.focus = false;
        clip.focus = true;
        this.actor = clip;
        return clip.index;
      }
    }
    return null;
  }

  hoverMeme(cursorLeft: number, cursorTop: number) {
    const clips = this.clips.sort((a, b) => b.getBottom() - a.getBottom()); // front first
    let picked = false;
    for (const clip of clips) {
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
      if (this.clips[i] != this.actor) {
        const x = 300 * Math.sin(j * factor);
        const y = 50 * Math.cos(j * factor);
        this.clips[i].target = [[450 + x, 300 + y]];
        j++;
      }
    }
  }

  waveClips() {
    for (let i = 0; i < this.clips.length; i++) {
      if (this.clips[i] != this.actor) {
        this.clips[i].target = [
          [150 + 60 * i, 300 + 30 * Math.cos(((i + 1) * Math.PI) / 3)],
        ];
      }
    }
  }

  lineClips() {
    const mid = this.clips.length / 2;
    for (let i = 0; i < mid; i++) {
      if (this.clips[i] != this.actor) {
        this.clips[i].target = [[370 - 40 * i, 300 + 20 * (i - 3)]];
      }
    }
    for (let i = mid; i < this.clips.length; i++) {
      if (this.clips[i] != this.actor) {
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
    this.actorState = "focus";
    this.actor.target = [[left, top]];
  }

  clearTargets() {
    for (let i = 0; i < this.clips.length; i++) {
      this.clips[i].target = [];
    }
  }

  restoreActor() {
    this.actorState = "restore";
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
      obj.setSpeed(1);
    }
  }
}
