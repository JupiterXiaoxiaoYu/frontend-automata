import React from "react";
import upgradProductivityButtonImage from "../../images/Buttons/UpgradeProductivity/productivity_normal.png";
import upgradProductivityButtonHoverImage from "../../images/Buttons/UpgradeProductivity/productivity_hover.png";
import upgradProductivityButtonClickImage from "../../images/Buttons/UpgradeProductivity/productivity_select.png";
import "./UpgradeProductivityButton.css";
import ParellogramToggleImageButton from "./ParellogramToggleImageButton";

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

const UpgradeProductivityButton = ({ isSelected, onClick }: Props) => {
  return (
    <div className="upgrade-productivity-button-scale">
      <ParellogramToggleImageButton
        isDisabled={false}
        isSelected={isSelected}
        defaultImagePath={upgradProductivityButtonImage}
        hoverImagePath={upgradProductivityButtonHoverImage}
        clickedImagePath={upgradProductivityButtonClickImage}
        disabledImagePath={upgradProductivityButtonClickImage}
        selectedImagePath={upgradProductivityButtonClickImage}
        onClick={onClick}
        imageWidth={122}
        imageHeight={73}
      />
    </div>
  );
};

export default UpgradeProductivityButton;
