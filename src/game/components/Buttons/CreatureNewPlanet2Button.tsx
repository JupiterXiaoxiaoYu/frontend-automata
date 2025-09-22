import React from "react";
import ImageButton from "../../script/common/ImageButton";
import image from "../../image/Buttons/CreatureNewPlanet2/creature_new.png";
import hoverImage from "../../image/Buttons/CreatureNewPlanet2/creature_new_hv.png";
import clickImage from "../../image/Buttons/CreatureNewPlanet2/creature_new_click.png";

export interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const CreatureNewPlanet2Button = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "283 / 209",
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

export default CreatureNewPlanet2Button;
