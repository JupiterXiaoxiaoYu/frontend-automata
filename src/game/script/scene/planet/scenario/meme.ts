import {
  getCreatureLeft,
  getCreatureSpriteSheetPath,
  getCreatureTop,
  ProgramType,
} from "../../../../../data/models";
import { HEIGHT, WIDTH } from "./draw";
import select_background from "../../../../image/backgrounds/robot_select.png";

const BACKGROUND_HEIGHT = 214;
const BACKGROUND_WIDTH = 143;
const CLIP_HEIGHT = 300;
const CLIP_WIDTH = 300;
const CLIP_FRAME_COUNT = 24;

export class ClipRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  constructor(top: number, left: number, right: number, bottom: number) {
    this.top = top;
    this.left = left;
    this.right = right;
    this.right = right;
    this.bottom = bottom;
  }
}

export class Clip {
  index: number;
  name: string;
  creatureType: number;
  src: HTMLImageElement;
  selectBackground: HTMLImageElement;
  left: number;
  top: number;
  currentFrame: number;
  ratio: number;
  focus: boolean;
  hover: boolean;
  target: Array<[number, number]>;
  constructor(index: number, creatureType: number, ratio: number) {
    this.index = index;
    this.name = `Robot ${index}`;
    this.creatureType = creatureType;

    const spriteSheetImage = new Image();
    spriteSheetImage.setAttribute("crossOrigin", "");
    spriteSheetImage.src = getCreatureSpriteSheetPath(creatureType);

    const selectBackgroundImage = new Image();
    selectBackgroundImage.setAttribute("crossOrigin", "");
    selectBackgroundImage.src = select_background;

    this.src = spriteSheetImage;
    this.selectBackground = selectBackgroundImage;
    this.left = getCreatureLeft(creatureType);
    this.top = getCreatureTop(creatureType);
    this.currentFrame = 0;
    this.ratio = ratio;
    this.focus = false;
    this.hover = false;
    this.target = [];
  }

  updateCreatureType(creatureType: number) {
    this.creatureType = creatureType;
    this.src.src = getCreatureSpriteSheetPath(creatureType);
    this.left = getCreatureLeft(creatureType);
    this.top = getCreatureTop(creatureType);
    this.currentFrame = 0;
  }

  inRect(cursorLeft: number, cursorTop: number): boolean {
    const bottom = this.top + CLIP_HEIGHT * this.ratio;
    const right = this.left + CLIP_WIDTH * this.ratio;
    const w_margin = (CLIP_WIDTH * this.ratio) / 4;
    const h_margin = (CLIP_HEIGHT * this.ratio) / 4;
    if (
      cursorLeft > this.left + w_margin &&
      cursorLeft < right - w_margin &&
      cursorTop > this.top + h_margin &&
      cursorTop < bottom
    ) {
      return true;
    }
    return false;
  }

  getBottom() {
    return this.top + CLIP_HEIGHT * this.ratio;
  }

  getZCenter() {
    return [
      this.left + (this.ratio * CLIP_WIDTH) / 2,
      this.top + (this.ratio * CLIP_HEIGHT) / 2,
    ];
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.focus == true) {
      ctx.fillStyle = "orange"; // Red color
      ctx.drawImage(
        this.selectBackground,
        0,
        0,
        BACKGROUND_WIDTH,
        BACKGROUND_HEIGHT,
        ((CLIP_WIDTH - BACKGROUND_WIDTH) / 2) * this.ratio + this.left,
        ((CLIP_HEIGHT - BACKGROUND_HEIGHT) / 2) * this.ratio + this.top,
        BACKGROUND_WIDTH * this.ratio,
        BACKGROUND_HEIGHT * this.ratio
      );
    } else {
      ctx.fillStyle = "black"; // Red color
    }

    ctx.drawImage(
      this.src,
      this.currentFrame * CLIP_WIDTH,
      0,
      CLIP_WIDTH,
      CLIP_HEIGHT,
      this.left,
      this.top,
      CLIP_WIDTH * this.ratio,
      CLIP_HEIGHT * this.ratio
    );

    const nameWidth = this.name.length * 7 + 5;
    ctx.fillRect(
      this.left + (CLIP_WIDTH * this.ratio - nameWidth) / 2,
      this.top - 13,
      nameWidth,
      15
    );
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(
      this.name,
      this.left + (CLIP_WIDTH * this.ratio - nameWidth) / 2 + 5,
      this.top
    );

    if (this.hover == true) {
      //ctx.fillStyle = 'hsl(20%, 100%, 15%)'; // Use 50% gray to desaturate
      //ctx.globalCompositeOperation = "saturation";
      ctx.beginPath();
      ctx.arc(
        this.left + (CLIP_WIDTH * this.ratio) / 2,
        this.top + (CLIP_HEIGHT * this.ratio) / 2,
        (CLIP_HEIGHT * this.ratio) / 3,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.setLineDash([10, 5]); // Dash of 10px and gap of 5px
      ctx.strokeStyle = "purple"; // Color of the dashed circle
      ctx.lineWidth = 2; // Thickness of the dashed line
      ctx.stroke();
    }
    /*
      ctx.fillText(this.currentClip, this.left+10, this.top); // text, x, y
      ctx.fillText(this.currentFrame.toString(), this.left + 10, this.top+30); // text, x, y
      */
  }

  incFrame() {
    this.currentFrame = (this.currentFrame + 1) % CLIP_FRAME_COUNT;
  }
}

export function createAnimationClip(index: number, programType: ProgramType) {
  return new Clip(index, programType, 0.5);
}
