import React from "react";
import ImageButton from "../../script/common/ImageButton";
import image from "../../image/Buttons/Planet1/planet1.png";
import hoverImage from "../../image/Buttons/Planet1/planet1_hv.png";
import clickImage from "../../image/Buttons/Planet1/planet1_click.png";
import disabledImage from "../../image/Buttons/Planet1/planet1_idle.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const Planet1Button = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "88 / 87",
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
        disabledImagePath={disabledImage}
      />
    </div>
  );
};

export default Planet1Button;
