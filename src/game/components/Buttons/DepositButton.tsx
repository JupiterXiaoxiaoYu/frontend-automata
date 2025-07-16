import React from "react";
import ImageButton from "./ImageButton";
import depositButtonImage from "../../image/Buttons/Deposit/deposit_normal.png";
import depositButtonHoverImage from "../../image/Buttons/Deposit/deposit_hover.png";
import depositButtonClickImage from "../../image/Buttons/Deposit/deposit_click.png";
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
        disabledImagePath={depositButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default DepositButton;
