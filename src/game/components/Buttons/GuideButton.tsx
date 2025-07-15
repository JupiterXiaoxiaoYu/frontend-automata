import React from "react";
import ImageButton from "./ImageButton";
import endGuideButtonImage from "../../image/Buttons/Guide/guide.png";
import endGuideButtonHoverImage from "../../image/Buttons/Guide/guide_hover.png";
import endGuideButtonClickImage from "../../image/Buttons/Guide/guide_click.png";
import "./GuideButton.css";

interface Props {
  onClick: () => void;
}

const GuideButton = ({ onClick }: Props) => {
  return (
    <div className="guide-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={endGuideButtonImage}
        hoverImagePath={endGuideButtonHoverImage}
        clickedImagePath={endGuideButtonClickImage}
        disabledImagePath={endGuideButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default GuideButton;
