import React, { useState } from "react";
import "./ImageButton.css";
import ElementButton from "./ElementButton";

interface Props {
  isDisabled: boolean;
  defaultImagePath: string;
  hoverImagePath: string;
  clickedImagePath: string;
  disabledImagePath: string;
  removeHoverWhenClicked?: boolean;
  onClick: () => void;
}

const ImageButton = ({
  isDisabled,
  defaultImagePath,
  hoverImagePath,
  clickedImagePath,
  disabledImagePath,
  removeHoverWhenClicked = false,
  onClick,
}: Props) => {
  return (
    <ElementButton
      isDisabled={isDisabled}
      defaultElement={<img className="image-button" src={defaultImagePath} />}
      hoverElement={<img className="image-button" src={hoverImagePath} />}
      clickedElement={<img className="image-button" src={clickedImagePath} />}
      disabledElement={<img className="image-button" src={disabledImagePath} />}
      removeHoverWhenClicked={removeHoverWhenClicked}
      onClick={onClick}
    />
  );
};

export default ImageButton;
