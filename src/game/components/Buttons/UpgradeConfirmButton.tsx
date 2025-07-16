import React from "react";
import ImageButton from "./ImageButton";
import upgradeConfirmButtonImage from "../../image/Buttons/UpgradeConfirm/upgrade_normal.png";
import upgradeConfirmButtonHoverImage from "../../image/Buttons/UpgradeConfirm/upgrade_hover.png";
import upgradeConfirmButtonClickImage from "../../image/Buttons/UpgradeConfirm/upgrade_click.png";
import upgradeConfirmButtonDisableImage from "../../image/Buttons/UpgradeConfirm/upgrade_disable.png";
import "./UpgradeConfirmButton.css";

interface Props {
  isDisable: boolean;
  onClick: () => void;
}

const UpgradeConfirmButton = ({ isDisable, onClick }: Props) => {
  return (
    <div className="upgrade-confirm-button-scale">
      <ImageButton
        isDisabled={isDisable}
        defaultImagePath={upgradeConfirmButtonImage}
        hoverImagePath={upgradeConfirmButtonHoverImage}
        clickedImagePath={upgradeConfirmButtonClickImage}
        disabledImagePath={upgradeConfirmButtonDisableImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UpgradeConfirmButton;
