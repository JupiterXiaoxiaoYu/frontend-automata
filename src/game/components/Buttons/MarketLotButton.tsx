import React from "react";
import GeneralImageButton from "./GeneralImageButton";
import marketLotButtonImage from "../../image/Buttons/MarketLot/lot.png";
import marketLotButtonHoverImage from "../../image/Buttons/MarketLot/lot_hv.png";
import marketLotButtonClickImage from "../../image/Buttons/MarketLot/lot_idle.png";

interface Props {
  onClick: () => void;
  isSelect: boolean;
}

const MarketLotButton = ({ onClick, isSelect }: Props) => {
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
        defaultImagePath={marketLotButtonImage}
        hoverImagePath={marketLotButtonHoverImage}
        clickedImagePath={marketLotButtonClickImage}
        disabledImagePath={marketLotButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default MarketLotButton;
