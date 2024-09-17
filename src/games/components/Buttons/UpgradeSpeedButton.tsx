import React from "react";
import upgradSpeedButtonImage from "../../images/Buttons/UpgradeSpeed/speed_normal.png";
import upgradSpeedButtonHoverImage from "../../images/Buttons/UpgradeSpeed/speed_hover.png";
import upgradSpeedButtonClickImage from "../../images/Buttons/UpgradeSpeed/speed_select.png";
import "./UpgradeSpeedButton.css";
import ParellogramToggleImageButton from "./ParellogramToggleImageButton";

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

const UpgradeSpeedButton = ({ isSelected, onClick }: Props) => {
  return (
    <div className="upgrade-speed-button-scale">
      <ParellogramToggleImageButton
        isDisabled={false}
        isSelected={isSelected}
        defaultImagePath={upgradSpeedButtonImage}
        hoverImagePath={upgradSpeedButtonHoverImage}
        clickedImagePath={upgradSpeedButtonClickImage}
        disabledImagePath={upgradSpeedButtonClickImage}
        selectedImagePath={upgradSpeedButtonClickImage}
        onClick={onClick}
        imageWidth={122}
        imageHeight={73}
      />
    </div>
  );
};

export default UpgradeSpeedButton;
