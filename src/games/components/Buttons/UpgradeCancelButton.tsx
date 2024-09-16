import React from "react";
import ImageButton from "./ImageButton";
import upgradeCancelButtonImage from "../../images/Buttons/UpgradeCancel/cancel_normal.png";
import upgradeCancelButtonHoverImage from "../../images/Buttons/UpgradeCancel/cancel_hover.png";
import upgradeCancelButtonClickImage from "../../images/Buttons/UpgradeCancel/cancel_click.png";
import "./UpgradeCancelButton.css";

interface Props {
  onClick: () => void;
}

const UpgradeCancelButton = ({ onClick }: Props) => {
  return (
    <div className="upgrade-cancel-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={upgradeCancelButtonImage}
        hoverImagePath={upgradeCancelButtonHoverImage}
        clickedImagePath={upgradeCancelButtonClickImage}
        disabledImagePath={upgradeCancelButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UpgradeCancelButton;
