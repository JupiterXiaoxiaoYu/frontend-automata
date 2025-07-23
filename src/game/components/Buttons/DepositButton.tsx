import React from "react";
import ImageButton from "./ImageButton";
import image from "../../image/Buttons/Deposit/deposit.png";
import hoverImage from "../../image/Buttons/Deposit/deposit_hv.png";
import clickImage from "../../image/Buttons/Deposit/deposit_click.png";

interface Props {
  onClick: () => void;
}

const DepositButton = ({ onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "106 / 70",
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

export default DepositButton;
