import React from "react";
import GeneralImageButton from "./GeneralImageButton";
import marketInventoryButtonImage from "../../images/Buttons/MarketInventory/inventory.png";
import marketInventoryButtonHoverImage from "../../images/Buttons/MarketInventory/inventory_hv.png";
import marketInventoryButtonClickImage from "../../images/Buttons/MarketInventory/inventory_idle.png";

interface Props {
  onClick: () => void;
  isSelect: boolean;
}

const MarketInventoryButton = ({ onClick, isSelect }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "auto",
        height: "100%",
        aspectRatio: "132 / 45",
        transform: "translate(-50%, -50%)",
        margin: "0px",
      }}
    >
      <GeneralImageButton
        isDisabled={isSelect}
        defaultImagePath={marketInventoryButtonImage}
        hoverImagePath={marketInventoryButtonHoverImage}
        clickedImagePath={marketInventoryButtonClickImage}
        disabledImagePath={marketInventoryButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default MarketInventoryButton;
