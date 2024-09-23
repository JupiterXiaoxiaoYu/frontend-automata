import React from "react";
import ImageButton from "./ImageButton";
import claimButtonImage from "../../images/Buttons/Claim/claim_normal.png";
import claimButtonHoverImage from "../../images/Buttons/Claim/claim_hover.png";
import claimButtonClickImage from "../../images/Buttons/Claim/claim_click.png";
import "./ClaimButton.css";

interface Props {
  onClick: () => void;
}

const ClaimButton = ({ onClick }: Props) => {
  return (
    <div className="claim-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={claimButtonImage}
        hoverImagePath={claimButtonHoverImage}
        clickedImagePath={claimButtonClickImage}
        disabledImagePath={claimButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ClaimButton;
