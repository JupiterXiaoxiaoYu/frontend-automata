import React from "react";
import ImageButton from "./ImageButton";
import redeemButtonImage from "../../images/Buttons/RedeemPanel/redeem_panel_normal.png";
import redeemButtonHoverImage from "../../images/Buttons/RedeemPanel/redeem_panel_hover.png";
import redeemButtonClickImage from "../../images/Buttons/RedeemPanel/redeem_panel_click.png";
import "./RedeemPanelButton.css";

interface Props {
  onClick: () => void;
}

const RedeemPanelButton = ({ onClick }: Props) => {
  return (
    <div className="redeem-panel-button-scale">
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

export default RedeemPanelButton;
