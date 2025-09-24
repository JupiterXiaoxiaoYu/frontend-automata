import {
  getCreatureLeft,
  getCreatureSpriteSheetPath,
  getCreatureTop,
  ProgramType,
} from "../../../../../data/models";
import creatingCreatureImage from "../../../../image/Animations/Creatures/idle_robot_select.png";
import stopCreatureImage from "../../../../image/Animations/Creatures/stop_robot.png";
import stopCreatureSelectedImage from "../../../../image/Animations/Creatures/stop_robot_select.png";
import { getTextShadowString } from "../../../common/Utility";

const CLIP_HEIGHT = 300;
const CLIP_WIDTH = 300;
const CLIP_FRAME_COUNT = 24;

export class CreatureAnimation {
  index: number;
  name: string;
  programType: ProgramType;
  creatureType: number;
  isCreating: boolean;
  isStop: boolean;
  src: HTMLImageElement;
  nameTextElement: HTMLParagraphElement | undefined;
  programTextElement: HTMLParagraphElement | undefined;
  left: number;
  top: number;
  currentFrame: number;
  ratio: number;
  focus: boolean;
  target: Array<[number, number]>;
  parent: HTMLElement;

  constructor(
    index: number,
    programType: ProgramType,
    creatureType: number,
    isCreating: boolean,
    isStop: boolean,
    ratio: number,
    parent: HTMLElement
  ) {
    this.index = index;
    this.name = `Robot ${index + 1}`;
    this.programType = programType;
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
    this.parent = parent;

    this.updateNameTextElement();
    this.updateProgramTextElement();
  }

  createNameTextElement() {
    const p = document.createElement("p");
    p.innerText = this.name;
    p.style.position = "absolute";
    p.style.color = "#81FF73";
    const fontSize = 20 * this.ratio;
    p.style.fontSize = `${fontSize}px`;
    p.style.fontFamily = "mishmash";
    p.style.textAlign = "center";
    p.style.textShadow = getTextShadowString(fontSize / 10, "#1C2B3D");
    this.parent.appendChild(p);
    return p;
  }

  updateNameTextElement() {
    if (!this.nameTextElement) {
      this.nameTextElement = this.createNameTextElement();
    }
    this.nameTextElement.innerText = this.name;
    this.nameTextElement.style.left = `${
      this.left +
      (CLIP_WIDTH * this.ratio - this.nameTextElement.offsetWidth) / 2
    }px`;
    this.nameTextElement.style.top = `${this.top - 10 * this.ratio}px`;
  }

  createProgramTextElement() {
    const p = document.createElement("p");
    p.style.position = "absolute";
    p.style.color = "white";
    const fontSize = 15 * this.ratio;
    p.style.fontSize = `${fontSize}px`;
    p.style.fontFamily = "mishmash";
    p.style.textAlign = "center";
    p.style.textShadow = getTextShadowString(fontSize / 10, "#1C2B3D");
    this.parent.appendChild(p);
    return p;
  }

  updateProgramTextElement() {
    if (!this.programTextElement) {
      this.programTextElement = this.createProgramTextElement();
    }
    this.programTextElement.innerText =
      ProgramType[this.programType].toString();
    this.programTextElement.style.left = `${
      this.left +
      (CLIP_WIDTH * this.ratio - this.programTextElement.offsetWidth) / 2
    }px`;
    this.programTextElement.style.top = `${this.top + 20 * this.ratio}px`;
  }

  destroy() {
    if (this.nameTextElement) {
      this.parent.removeChild(this.nameTextElement);
    }

    if (this.programTextElement) {
      this.parent.removeChild(this.programTextElement);
    }
  }

  getSrc(
    creatureType: number,
    isSelected: boolean,
    isCreating: boolean,
    isStop: boolean
  ) {
    if (isCreating) {
      return creatingCreatureImage;
    }
    if (isStop) {
      return isSelected ? stopCreatureSelectedImage : stopCreatureImage;
    }
    return getCreatureSpriteSheetPath(creatureType, isSelected);
  }

  update(
    programType: ProgramType,
    creatureType: number,
    isCreating: boolean,
    isStop: boolean
  ) {
    this.programType = programType;
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
    this.updateNameTextElement();
    this.updateProgramTextElement();
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
  }

  incFrame() {
    this.currentFrame = (this.currentFrame + 1) % CLIP_FRAME_COUNT;
  }
}
