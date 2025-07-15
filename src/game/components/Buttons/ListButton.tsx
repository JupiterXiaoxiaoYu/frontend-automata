import React from "react";
import ImageButton from "./ImageButton";
import listButtonImage from "../../image/Buttons/List/list.png";
import listButtonHoverImage from "../../image/Buttons/List/list_hv.png";
import listButtonClickImage from "../../image/Buttons/List/list_click.png";
import "./ListButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const ListButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="list-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={listButtonImage}
        hoverImagePath={listButtonHoverImage}
        clickedImagePath={listButtonClickImage}
        disabledImagePath={listButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ListButton;
