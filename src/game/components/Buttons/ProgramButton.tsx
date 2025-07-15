import React from "react";
import ImageButton from "./ImageButton";
import programButtonImage from "../../image/Buttons/Program/program_button.png";
import programButtonHoverImage from "../../image/Buttons/Program/program_hover.png";
import programButtonClickImage from "../../image/Buttons/Program/program_click.png";
// import programButtonDisabledImage from "../../image/Buttons/Program/program_disabled.png";
import "./ProgramButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const ProgramButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="program-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={programButtonImage}
        hoverImagePath={programButtonHoverImage}
        clickedImagePath={programButtonClickImage}
        disabledImagePath={programButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ProgramButton;
