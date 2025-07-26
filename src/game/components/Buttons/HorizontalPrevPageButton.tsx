import React from "react";
import ImageButton from "../../script/common/ImageButton";
import backButtonImage from "../../image/Buttons/HorizontalPrevPage/back.png";
import backButtonHoverImage from "../../image/Buttons/HorizontalPrevPage/back_hover.png";
import backButtonClickImage from "../../image/Buttons/HorizontalPrevPage/back_click.png";
import disabledButtonClickImage from "../../image/Buttons/HorizontalPrevPage/back_idle.png";
import "./HorizontalPrevPageButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const HorizontalPrevPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="horizontal-prev-page-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={backButtonImage}
        hoverImagePath={backButtonHoverImage}
        clickedImagePath={backButtonClickImage}
        disabledImagePath={disabledButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default HorizontalPrevPageButton;
