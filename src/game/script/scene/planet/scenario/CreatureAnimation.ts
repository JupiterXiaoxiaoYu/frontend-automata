import {
  getCreatureLeft,
  getCreatureSpriteSheetPath,
  getCreatureTop,
  ProgramType,
} from "../../../../../data/models";
import creatingCreatureImage from "../../../../image/Animations/Creatures/idle_robot_select.png";
import stopCreatureImage from "../../../../image/Animations/Creatures/stop_robot.png";
import stopCreatureSelectedImage from "../../../../image/Animations/Creatures/stop_robot_select.png";

const CLIP_HEIGHT = 300;
const CLIP_WIDTH = 300;
const CLIP_FRAME_COUNT = 24;

export class CreatureAnimation {
  index: number;
  name: string;
  creatureType: number;
  isCreating: boolean;
  isStop: boolean;
  src: HTMLImageElement;
  left: number;
  top: number;
  currentFrame: number;
  ratio: number;
  focus: boolean;
  target: Array<[number, number]>;

  constructor(
    index: number,
    creatureType: number,
    isCreating: boolean,
    isStop: boolean,
    ratio: number
  ) {
    this.index = index;
    this.name = `Robot ${index + 1}`;
    this.creatureType = creatureType;
    this.isCreating = isCreating;
    this.isStop = isStop;
    this.focus = false;

    const spriteSheetImage = new Image();
    spriteSheetImage.setAttribute("crossOrigin", "");
    spriteSheetImage.src = this.getSrc(
      this.creatureType,
      this.focus,
      this.isCreating,
      this.isStop
    );

    this.src = spriteSheetImage;
    this.left = getCreatureLeft(this.creatureType) * ratio;
    this.top = getCreatureTop(this.creatureType) * ratio;
    this.currentFrame = 0;
    this.ratio = ratio;
    this.target = [];
  }

  getSrc(
    creatureType: number,
    isSelected: boolean,
    isCreating: boolean,
    isStop: boolean
  ) {
    console.log("getSrc", {
      creatureType,
      isSelected,
      isCreating,
      isStop,
    });
    if (isCreating) {
      return creatingCreatureImage;
    }
    if (isStop) {
      return isSelected ? stopCreatureSelectedImage : stopCreatureImage;
    }
    return getCreatureSpriteSheetPath(creatureType, isSelected);
  }

  updateCreatureType(
    creatureType: number,
    isCreating: boolean,
    isStop: boolean
  ) {
    this.creatureType = creatureType;
    this.isCreating = isCreating;
    this.isStop = isStop;
    this.src.src = this.getSrc(
      this.creatureType,
      this.focus,
      this.isCreating,
      this.isStop
    );
    this.left = getCreatureLeft(creatureType) * this.ratio;
    this.top = getCreatureTop(creatureType) * this.ratio;
  }

  updateFocus(focus: boolean) {
    this.focus = focus;
    this.src.src = this.getSrc(
      this.creatureType,
      this.focus,
      this.isCreating,
      this.isStop
    );
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

    if (this.isCreating || this.isStop) {
      ctx.drawImage(
        this.src,
        0,
        0,
        CLIP_WIDTH,
        CLIP_HEIGHT,
        this.left,
        this.top,
        CLIP_WIDTH * this.ratio,
        CLIP_HEIGHT * this.ratio
      );
    } else {
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
    }

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
