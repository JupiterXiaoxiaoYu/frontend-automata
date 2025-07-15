import React from "react";
import ImageButton from "./ImageButton";
import creatureConfirmButtonImage from "../../image/Buttons/CreatureConfirm/creature_confirm.png";
import creatureConfirmButtonHoverImage from "../../image/Buttons/CreatureConfirm/creature_confirm_hv.png";
import creatureConfirmButtonClickImage from "../../image/Buttons/CreatureConfirm/creature_confirm_click.png";
import "./CreatureConfirmButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const CreatureConfirmButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="creature-confirm-button">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={creatureConfirmButtonImage}
        hoverImagePath={creatureConfirmButtonHoverImage}
        clickedImagePath={creatureConfirmButtonClickImage}
        disabledImagePath={creatureConfirmButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default CreatureConfirmButton;
