import React from "react";
import ImageButton from "./ImageButton";
import image from "../../image/Buttons/RedeemScene/redeem_scene.png";
import hoverImage from "../../image/Buttons/RedeemScene/redeem_scene_hv.png";
import clickImage from "../../image/Buttons/RedeemScene/redeem_scene_click.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const RedeemSceneButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "124 / 74",
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

export default RedeemSceneButton;
