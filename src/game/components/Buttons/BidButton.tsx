import React from "react";
import ImageButton from "./ImageButton";
import bidButtonImage from "../../image/Buttons/Bid/bid.png";
import bidButtonHoverImage from "../../image/Buttons/Bid/bid_hv.png";
import bidButtonClickImage from "../../image/Buttons/Bid/bid_click.png";
import "./BidButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const BidButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="bid-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={bidButtonImage}
        hoverImagePath={bidButtonHoverImage}
        clickedImagePath={bidButtonClickImage}
        disabledImagePath={bidButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default BidButton;
