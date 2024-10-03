import React from "react";
import ImageButton from "./ImageButton";
import redeemButtonImage from "../../images/Buttons/Redeem/redeem_normal.png";
import redeemButtonHoverImage from "../../images/Buttons/Redeem/redeem_hover.png";
import redeemButtonClickImage from "../../images/Buttons/Redeem/redeem_click.png";
import redeemButtonDisabledImage from "../../images/Buttons/Redeem/redeem_idle.png";
import "./RedeemButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const RedeemButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="redeem-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={redeemButtonImage}
        hoverImagePath={redeemButtonHoverImage}
        clickedImagePath={redeemButtonClickImage}
        disabledImagePath={redeemButtonDisabledImage}
        onClick={onClick}
      />
    </div>
  );
};

export default RedeemButton;
