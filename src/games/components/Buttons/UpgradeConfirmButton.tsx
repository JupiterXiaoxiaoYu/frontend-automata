import React from "react";
import ImageButton from "./ImageButton";
import upgradeConfirmButtonImage from "../../images/Buttons/UpgradeConfirm/upgrade_normal.png";
import upgradeConfirmButtonHoverImage from "../../images/Buttons/UpgradeConfirm/upgrade_hover.png";
import upgradeConfirmButtonClickImage from "../../images/Buttons/UpgradeConfirm/upgrade_click.png";
import "./UpgradeConfirmButton.css";

interface Props {
  onClick: () => void;
}

const UpgradeConfirmButton = ({ onClick }: Props) => {
  return (
    <div className="upgrade-confirm-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={upgradeConfirmButtonImage}
        hoverImagePath={upgradeConfirmButtonHoverImage}
        clickedImagePath={upgradeConfirmButtonClickImage}
        disabledImagePath={upgradeConfirmButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UpgradeConfirmButton;
