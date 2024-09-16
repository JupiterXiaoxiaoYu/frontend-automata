import React from "react";
import upgradEfficiencyButtonImage from "../../images/Buttons/UpgradeEfficiency/efficiency_normal.png";
import upgradEfficiencyButtonHoverImage from "../../images/Buttons/UpgradeEfficiency/efficiency_hover.png";
import upgradEfficiencyButtonClickImage from "../../images/Buttons/UpgradeEfficiency/efficiency_select.png";
import "./UpgradeEfficiencyButton.css";
import ParellogramToggleImageButton from "./ParellogramToggleImageButton";

interface Props {
  onClick: () => void;
}

const UpgradeEfficiencyButton = ({ onClick }: Props) => {
  return (
    <div className="upgrade-efficiency-button-scale">
      <ParellogramToggleImageButton
        isDisabled={false}
        isSelected={false}
        defaultImagePath={upgradEfficiencyButtonImage}
        hoverImagePath={upgradEfficiencyButtonHoverImage}
        clickedImagePath={upgradEfficiencyButtonClickImage}
        disabledImagePath={upgradEfficiencyButtonClickImage}
        selectedImagePath={upgradEfficiencyButtonClickImage}
        onClick={onClick}
        imageWidth={122}
        imageHeight={73}
      />
    </div>
  );
};

export default UpgradeEfficiencyButton;
