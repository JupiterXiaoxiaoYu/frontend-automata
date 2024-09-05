import React from "react";
import ImageButton from "./ImageButton";
import programButtonImage from "../../images/Buttons/Program/program_button.png";
import programButtonHoverImage from "../../images/Buttons/Program/program_hover.png";
import programButtonClickImage from "../../images/Buttons/Program/program_click.png";
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
        disabledImagePath={programButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ProgramButton;
