import React from "react";
import GeneralImageButton from "./GeneralImageButton";
import marketAuctionButtonImage from "../../image/Buttons/MarketAuction/auction.png";
import marketAuctionButtonHoverImage from "../../image/Buttons/MarketAuction/auction_hv.png";
import marketAuctionButtonClickImage from "../../image/Buttons/MarketAuction/auction_idle.png";

interface Props {
  onClick: () => void;
  isSelect: boolean;
}

const MarketAuctionButton = ({ onClick, isSelect }: Props) => {
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
        defaultImagePath={marketAuctionButtonImage}
        hoverImagePath={marketAuctionButtonHoverImage}
        clickedImagePath={marketAuctionButtonClickImage}
        disabledImagePath={marketAuctionButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default MarketAuctionButton;
