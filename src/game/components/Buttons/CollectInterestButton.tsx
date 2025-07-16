import React from "react";
import ImageButton from "./ImageButton";
import collectButtonImage from "../../image/Buttons/CollectInterest/collect_normal.png";
import collectButtonHoverImage from "../../image/Buttons/CollectInterest/collect_hv.png";
import collectButtonClickImage from "../../image/Buttons/CollectInterest/collect_click.png";
import collectButtonDisableImage from "../../image/Buttons/CollectInterest/collect_idle.png";
import "./CollectInterestButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const CollectInterestButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="collect-interest-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={collectButtonImage}
        hoverImagePath={collectButtonHoverImage}
        clickedImagePath={collectButtonClickImage}
        disabledImagePath={collectButtonDisableImage}
        onClick={onClick}
      />
    </div>
  );
};

export default CollectInterestButton;
