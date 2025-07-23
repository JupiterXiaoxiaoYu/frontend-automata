import React from "react";
import ImageButton from "./ImageButton";
import image from "../../image/Buttons/Ok/ok.png";
import hoverImage from "../../image/Buttons/Ok/ok_hv.png";
import clickImage from "../../image/Buttons/Ok/ok_click.png";

interface Props {
  onClick: () => void;
}

const OkButton = ({ onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "55 / 23",
        transform: "translate(-50%, -50%)",
        margin: "0px",
      }}
    >
      <ImageButton
        onClick={onClick}
        isDisabled={false}
        defaultImagePath={image}
        hoverImagePath={hoverImage}
        clickedImagePath={clickImage}
        disabledImagePath={clickImage}
      />
    </div>
  );
};

export default OkButton;
