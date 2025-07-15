import React from "react";
import ImageButton from "./ImageButton";
import emptyButtonImage from "../../image/Buttons/Empty/empty_normal.png";
import emptyButtonHoverImage from "../../image/Buttons/Empty/empty_hover.png";
import emptyButtonClickImage from "../../image/Buttons/Empty/empty_click.png";
import "./EmptyButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const EmptyButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="empty-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={emptyButtonImage}
        hoverImagePath={emptyButtonHoverImage}
        clickedImagePath={emptyButtonClickImage}
        disabledImagePath={emptyButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default EmptyButton;
