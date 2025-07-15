import React from "react";
import ImageButton from "./ImageButton";
import upgradeButtonImage from "../../images/Buttons/Upgrade/upgrade.png";
import upgradeButtonHoverImage from "../../images/Buttons/Upgrade/upgrade_hv.png";
import upgradeButtonClickImage from "../../images/Buttons/Upgrade/upgrade_click.png";
import upgradeButtonDisabledImage from "../../images/Buttons/Upgrade/upgrade_idle.png";
import "./UpgradeButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const UpgradeButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="upgrade-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={upgradeButtonImage}
        hoverImagePath={upgradeButtonHoverImage}
        clickedImagePath={upgradeButtonClickImage}
        disabledImagePath={upgradeButtonDisabledImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UpgradeButton;
