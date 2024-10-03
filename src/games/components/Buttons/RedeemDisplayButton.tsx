import React from "react";
import ImageButton from "./ImageButton";
import redeemButtonImage from "../../images/Buttons/RedeemDisplay/redeem_display_normal.png";
import redeemButtonHoverImage from "../../images/Buttons/RedeemDisplay/redeem_display_hover.png";
import redeemButtonClickImage from "../../images/Buttons/RedeemDisplay/redeem_display_click.png";
import redeemButtonDisabledImage from "../../images/Buttons/RedeemDisplay/redeem_display_idle.png";
import "./RedeemDisplayButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const RedeemDisplayButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="redeem-display-button-scale">
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

export default RedeemDisplayButton;
