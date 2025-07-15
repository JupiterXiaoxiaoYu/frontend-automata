import React from "react";
import ImageButton from "./ImageButton";
import marketButtonImage from "../../images/Buttons/Market/market.png";
import marketButtonHoverImage from "../../images/Buttons/Market/market_hv.png";
import marketButtonClickImage from "../../images/Buttons/Market/market_click.png";
import "./MarketButton.css";

interface Props {
  onClick: () => void;
}

const MarketButton = ({ onClick }: Props) => {
  return (
    <div className="market-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={marketButtonImage}
        hoverImagePath={marketButtonHoverImage}
        clickedImagePath={marketButtonClickImage}
        disabledImagePath={marketButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default MarketButton;
