import React from "react";
import ImageButton from "./ImageButton";
import creatureUnlockButtonImage from "../../images/Buttons/CreatureUnlock/creature_unlock.png";
import creatureUnlockButtonHoverImage from "../../images/Buttons/CreatureUnlock/creature_unlock_hover.png";
import creatureUnlockButtonClickImage from "../../images/Buttons/CreatureUnlock/creature_unlock_click.png";
import "./CreatureUnlockButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const CreatureUnlockButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="creature-unlock-button">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={creatureUnlockButtonImage}
        hoverImagePath={creatureUnlockButtonHoverImage}
        clickedImagePath={creatureUnlockButtonClickImage}
        disabledImagePath={creatureUnlockButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default CreatureUnlockButton;
