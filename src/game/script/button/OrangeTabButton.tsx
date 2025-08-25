import leftNormalImage from "../../image/button/orange_button/left.png";
import midNormalImage from "../../image/button/orange_button/mid.png";
import rightNormalImage from "../../image/button/orange_button/right.png";
import leftHoverImage from "../../image/button/orange_button/left_hv.png";
import midHoverImage from "../../image/button/orange_button/mid_hv.png";
import rightHoverImage from "../../image/button/orange_button/right_hv.png";
import leftClickImage from "../../image/button/orange_button/left_click.png";
import midClickImage from "../../image/button/orange_button/mid_click.png";
import rightClickImage from "../../image/button/orange_button/right_click.png";
import AdjustableImageTextButton from "../common/AdjustableImageTextButton";
import { getTextShadowStyle } from "../common/Utility";

interface Props {
  id?: number;
  text: string;
  onClick: () => void;
  isDisabled: boolean;
  fontSizeRatio?: number;
}

const OrangeTabButton = ({
  id = 0,
  text,
  onClick,
  isDisabled,
  fontSizeRatio = 0.8,
}: Props) => {
  const leftRatio = 30 / 70;
  const rightRatio = 30 / 70;
  const fontFamily = "mishmash";
  const isBold = true;
  const color = "white";

  const getText = (fontBaseSize: number) => {
    const fontSize = fontBaseSize * fontSizeRatio;
    return (
      <p
        className="adjustable-image-text-button-text"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "90%",
          height: "auto",
          transform: "translate(-50%, -50%)",
          margin: "0px",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
          color: color,
          fontFamily: fontFamily,
          fontSize: `${fontSize}px`,
          whiteSpace: "pre",
          ...(isBold ? { fontWeight: "bold" } : {}),
          ...getTextShadowStyle(fontSize / 15),
        }}
      >
        {text}
      </p>
    );
  };

  return (
    <AdjustableImageTextButton
      id={id}
      onClick={onClick}
      isDisabled={isDisabled}
      leftRatio={leftRatio}
      rightRatio={rightRatio}
      leftNormalImage={leftClickImage}
      midNormalImage={midClickImage}
      rightNormalImage={rightClickImage}
      leftHoverImage={leftHoverImage}
      midHoverImage={midHoverImage}
      rightHoverImage={rightHoverImage}
      leftClickImage={leftNormalImage}
      midClickImage={midNormalImage}
      rightClickImage={rightNormalImage}
      leftDisabledImage={leftNormalImage}
      midDisabledImage={midNormalImage}
      rightDisabledImage={rightNormalImage}
      getText={getText}
    />
  );
};

export default OrangeTabButton;
