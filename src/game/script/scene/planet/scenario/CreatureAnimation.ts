import {
  getCreatureLeft,
  getCreatureSpriteSheetPath,
  getCreatureTop,
  ProgramType,
} from "../../../../../data/models";

const CLIP_HEIGHT = 300;
const CLIP_WIDTH = 300;
const CLIP_FRAME_COUNT = 24;

export class CreatureAnimation {
  index: number;
  name: string;
  creatureType: number;
  src: HTMLImageElement;
  left: number;
  top: number;
  currentFrame: number;
  ratio: number;
  focus: boolean;
  target: Array<[number, number]>;

  constructor(index: number, creatureType: number, ratio: number) {
    this.index = index;
    this.name = `Robot ${index + 1}`;
    this.creatureType = creatureType;

    const spriteSheetImage = new Image();
    spriteSheetImage.setAttribute("crossOrigin", "");
    spriteSheetImage.src = getCreatureSpriteSheetPath(creatureType, false);

    this.src = spriteSheetImage;
    this.left = getCreatureLeft(creatureType) * ratio;
    this.top = getCreatureTop(creatureType) * ratio;
    this.currentFrame = 0;
    this.ratio = ratio;
    this.focus = false;
    this.target = [];
  }

  updateCreatureType(creatureType: number) {
    this.creatureType = creatureType;
    this.src.src = getCreatureSpriteSheetPath(creatureType, this.focus);
    this.left = getCreatureLeft(creatureType) * this.ratio;
    this.top = getCreatureTop(creatureType) * this.ratio;
    this.currentFrame = 0;
  }

  updateFocus(focus: boolean) {
    this.focus = focus;
    this.src.src = getCreatureSpriteSheetPath(this.creatureType, this.focus);
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
      cursorTop < bottom - h_margin
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
  }

  incFrame() {
    this.currentFrame = (this.currentFrame + 1) % CLIP_FRAME_COUNT;
  }
}
