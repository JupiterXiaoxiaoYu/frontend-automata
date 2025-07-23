import React from "react";
import ImageButton from "./ImageButton";
import image from "../../image/Buttons/UpgradeConfirm/upgrade_confirm.png";
import hoverImage from "../../image/Buttons/UpgradeConfirm/upgrade_confirm_hv.png";
import clickImage from "../../image/Buttons/UpgradeConfirm/upgrade_confirm_click.png";
import disabledImage from "../../image/Buttons/UpgradeConfirm/upgrade_confirm_idle.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const UpgradeConfirmButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "78 / 22",
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

export default UpgradeConfirmButton;
