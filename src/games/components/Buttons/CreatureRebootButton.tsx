import React from "react";
import ImageButton from "./ImageButton";
import creatureRebootButtonImage from "../../images/Buttons/CreatureReboot/creature_reboot.png";
import creatureRebootButtonHoverImage from "../../images/Buttons/CreatureReboot/creature_reboot_hover.png";
import creatureRebootButtonClickImage from "../../images/Buttons/CreatureReboot/creature_reboot_click.png";
import "./CreatureRebootButton.css";

interface Props {
  onClick: () => void;
}

const CreatureRebootButton = ({ onClick }: Props) => {
  return (
    <div className="creature-reboot-button">
      <ImageButton
        isDisabled={false}
        defaultImagePath={creatureRebootButtonImage}
        hoverImagePath={creatureRebootButtonHoverImage}
        clickedImagePath={creatureRebootButtonClickImage}
        disabledImagePath={creatureRebootButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default CreatureRebootButton;
