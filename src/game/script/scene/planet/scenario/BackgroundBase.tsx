import { Clip, ClipRect } from "./meme";
import { Beat, FocusTorch, HEIGHT, Light, Torch, WIDTH } from "./draw";

export class BackgroundBase {
  clips: Array<Clip>;
  context?: CanvasRenderingContext2D;

  constructor(clips: Array<Clip>) {
    this.clips = clips;
  }

  init(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw(): void {
    /* */
  }
}

export enum ShapeState {
  None,
  Text,
  Image,
}

export class ShapeProps {
  state: ShapeState;
  text: string | null;
  image: HTMLImageElement | null;
  imageRect: ClipRect | null;

  private constructor(
    state: ShapeState,
    text?: string | null,
    image?: HTMLImageElement | null,
    imageRect?: ClipRect | null
  ) {
    this.state = state;
    this.text = text ?? null;
    this.image = image ?? null;
    this.imageRect = imageRect ?? null;
  }

  static GetEmptyShape(): ShapeProps {
    return new ShapeProps(ShapeState.None);
  }

  static GetTextShape(text: string): ShapeProps {
    return new ShapeProps(ShapeState.Text, text);
  }

  static GetImageShape(
    image: HTMLImageElement,
    imageRect: ClipRect
  ): ShapeProps {
    return new ShapeProps(ShapeState.Image, null, image, imageRect);
  }
}
