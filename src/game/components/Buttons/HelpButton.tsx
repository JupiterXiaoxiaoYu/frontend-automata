import React from "react";
import ImageButton from "./ImageButton";
import helpButtonImage from "../../images/Buttons/Help/help.png";
import helpButtonHoverImage from "../../images/Buttons/Help/help_hover.png";
import helpButtonClickImage from "../../images/Buttons/Help/help_click.png";
import "./HelpButton.css";

interface Props {
  onClick: () => void;
}

const HelpButton = ({ onClick }: Props) => {
  return (
    <div className="help-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={helpButtonImage}
        hoverImagePath={helpButtonHoverImage}
        clickedImagePath={helpButtonClickImage}
        disabledImagePath={helpButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default HelpButton;
