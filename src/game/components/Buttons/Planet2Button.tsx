import React from "react";
import ImageButton from "../../script/common/ImageButton";
import image from "../../image/Buttons/Planet2/planet2.png";
import hoverImage from "../../image/Buttons/Planet2/planet2_hv.png";
import clickImage from "../../image/Buttons/Planet2/planet2_click.png";
import disabledImage from "../../image/Buttons/Planet2/planet2_idle.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const Planet2Button = ({ isDisabled, onClick }: Props) => {
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

export default Planet2Button;
