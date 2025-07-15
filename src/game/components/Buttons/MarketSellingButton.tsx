import React from "react";
import GeneralImageButton from "./GeneralImageButton";
import marketSellingButtonImage from "../../image/Buttons/MarketSelling/selling.png";
import marketSellingButtonHoverImage from "../../image/Buttons/MarketSelling/selling_hv.png";
import marketSellingButtonClickImage from "../../image/Buttons/MarketSelling/selling_idle.png";

interface Props {
  onClick: () => void;
  isSelect: boolean;
}

const MarketSellingButton = ({ onClick, isSelect }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "132 / 45",
        transform: "translate(-50%, -50%)",
        margin: "0px",
      }}
    >
      <GeneralImageButton
        isDisabled={isSelect}
        defaultImagePath={marketSellingButtonImage}
        hoverImagePath={marketSellingButtonHoverImage}
        clickedImagePath={marketSellingButtonClickImage}
        disabledImagePath={marketSellingButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default MarketSellingButton;
