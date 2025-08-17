import React from "react";
import ImageButton from "../../script/common/ImageButton";
import image from "../../image/Buttons/PrevPage/up.png";
import hoverImage from "../../image/Buttons/PrevPage/up_hv.png";
import clickImage from "../../image/Buttons/PrevPage/up_click.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const PrevPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "52 / 45",
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

export default PrevPageButton;
