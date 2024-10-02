import React from "react";
import ImageButton from "./ImageButton";
import upgradeButtonImage from "../../images/Buttons/Upgrade/upgrade_normal.png";
import upgradeButtonHoverImage from "../../images/Buttons/Upgrade/upgrade_hover.png";
import upgradeButtonClickImage from "../../images/Buttons/Upgrade/upgrade_click.png";
import "./UpgradeButton.css";

interface Props {
  onClick: () => void;
}

const UpgradeButton = ({ onClick }: Props) => {
  return (
    <div className="upgrade-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={upgradeButtonImage}
        hoverImagePath={upgradeButtonHoverImage}
        clickedImagePath={upgradeButtonClickImage}
        disabledImagePath={upgradeButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UpgradeButton;
