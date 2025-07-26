import React from "react";
import ImageButton from "../../script/common/ImageButton";
import image from "../../image/Buttons/CreatureConfirm/creature_confirm.png";
import hoverImage from "../../image/Buttons/CreatureConfirm/creature_confirm_hv.png";
import clickImage from "../../image/Buttons/CreatureConfirm/creature_confirm_click.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const CreatureConfirmButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "132 / 128",
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

export default CreatureConfirmButton;
