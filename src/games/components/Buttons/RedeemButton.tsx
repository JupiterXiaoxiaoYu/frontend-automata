import React from "react";
import ImageButton from "./ImageButton";
import redeemButtonImage from "../../images/Buttons/Redeem/redeem_normal.png";
import redeemButtonHoverImage from "../../images/Buttons/Redeem/redeem_hover.png";
import redeemButtonClickImage from "../../images/Buttons/Redeem/redeem_click.png";
import "./RedeemButton.css";

interface Props {
  onClick: () => void;
}

const RedeemButton = ({ onClick }: Props) => {
  return (
    <div className="redeem-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={redeemButtonImage}
        hoverImagePath={redeemButtonHoverImage}
        clickedImagePath={redeemButtonClickImage}
        disabledImagePath={redeemButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default RedeemButton;
