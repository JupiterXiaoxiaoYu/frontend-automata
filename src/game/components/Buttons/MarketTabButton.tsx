import normalImage from "../../image/Buttons/MarketTab/tab.png";
import hoverImage from "../../image/Buttons/MarketTab/tab_hv.png";
import clickImage from "../../image/Buttons/MarketTab/tab_click.png";
import ImageTextButton from "./ImageTextButton";

interface Props {
  id?: number;
  text: string;
  onClick: () => void;
  isSelect: boolean;
  normalColor: string;
  selectColor: string;
}

const MarketTabButton = ({
  id = 0,
  text,
  onClick,
  isSelect,
  normalColor,
  selectColor,
}: Props) => {
  const fontSizeRatio = 0.5;
  const fontFamily = "mishmash";
  const isBold = false;
  const color = isSelect ? selectColor : normalColor;

  const getText = (fontBaseSize: number) => {
    const fontSize = fontBaseSize * fontSizeRatio;
    return (
      <p
        className="image-text-button-text"
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
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
        }}
      >
        {text}
      </p>
    );
  };

  return (
    <ImageTextButton
      id={id}
      onClick={onClick}
      isDisabled={isSelect}
      normalImage={normalImage}
      hoverImage={hoverImage}
      clickImage={clickImage}
      disabledImage={clickImage}
      getText={getText}
    />
  );
};

export default MarketTabButton;
