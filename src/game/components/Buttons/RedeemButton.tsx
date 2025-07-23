import React from "react";
import ImageButton from "./ImageButton";
import image from "../../image/Buttons/Redeem/redeem.png";
import hoverImage from "../../image/Buttons/Redeem/redeem_hv.png";
import clickImage from "../../image/Buttons/Redeem/redeem_click.png";

interface Props {
  onClick: () => void;
}

const RedeemButton = ({ onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "74 / 62",
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

export default RedeemButton;
