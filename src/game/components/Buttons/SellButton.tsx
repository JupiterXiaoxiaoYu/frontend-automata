import React from "react";
import ImageButton from "./ImageButton";
import sellButtonImage from "../../image/Buttons/Sell/sell.png";
import sellButtonHoverImage from "../../image/Buttons/Sell/sell_hv.png";
import sellButtonClickImage from "../../image/Buttons/Sell/sell_click.png";
import "./SellButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const SellButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="sell-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={sellButtonImage}
        hoverImagePath={sellButtonHoverImage}
        clickedImagePath={sellButtonClickImage}
        disabledImagePath={sellButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default SellButton;
