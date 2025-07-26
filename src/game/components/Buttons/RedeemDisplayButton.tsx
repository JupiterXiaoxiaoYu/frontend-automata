import React from "react";
import ImageButton from "../../script/common/ImageButton";
import image from "../../image/Buttons/RedeemDisplay/redeem_display.png";
import hoverImage from "../../image/Buttons/RedeemDisplay/redeem_display_hv.png";
import clickImage from "../../image/Buttons/RedeemDisplay/redeem_display_click.png";
import disabledImage from "../../image/Buttons/RedeemDisplay/redeem_display_idle.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const RedeemDisplayButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "97 / 50",
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

export default RedeemDisplayButton;
