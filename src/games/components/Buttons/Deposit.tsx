import React from "react";
import ImageButton from "./ImageButton";
import depositButtonImage from "../../images/Buttons/Deposit/deposit_normal.png";
import depositButtonHoverImage from "../../images/Buttons/Deposit/deposit_hover.png";
import depositButtonClickImage from "../../images/Buttons/Deposit/deposit_click.png";
import "./DepositButton.css";

interface Props {
  onClick: () => void;
}

const DepositButton = ({ onClick }: Props) => {
  return (
    <div className="deposit-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={depositButtonImage}
        hoverImagePath={depositButtonHoverImage}
        clickedImagePath={depositButtonClickImage}
        disabledImagePath={depositButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default DepositButton;
