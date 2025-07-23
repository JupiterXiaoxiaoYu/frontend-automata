import React from "react";
import ImageButton from "./ImageButton";
import image from "../../image/Buttons/Program/program.png";
import hoverImage from "../../image/Buttons/Program/program_hv.png";
import clickImage from "../../image/Buttons/Program/program_click.png";

interface Props {
  isDisabled: boolean; // Optional prop for future use
  onClick: () => void;
}

const ProgramButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "168 / 88",
        transform: "translate(-50%, -50%)",
        margin: "0px",
      }}
    >
      <ImageButton
        onClick={onClick}
        isDisabled={isDisabled}
        defaultImagePath={image}
        hoverImagePath={hoverImage}
        clickedImagePath={clickImage}
        disabledImagePath={clickImage}
      />
    </div>
  );
};

export default ProgramButton;
