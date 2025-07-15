import React from "react";
import ImageButton from "./ImageButton";
import confirmButtonImage from "../../image/Buttons/Confirm/confirm_normal.png";
import confirmButtonHoverImage from "../../image/Buttons/Confirm/confirm_hover.png";
import confirmButtonClickImage from "../../image/Buttons/Confirm/confirm_click.png";
import "./ConfirmButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const ConfirmButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="confirm-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={confirmButtonImage}
        hoverImagePath={confirmButtonHoverImage}
        clickedImagePath={confirmButtonClickImage}
        disabledImagePath={confirmButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ConfirmButton;
