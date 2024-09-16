import React, { useState } from "react";
import "./ParellogramToggleImageButton.css";

interface Props {
  isDisabled: boolean;
  isSelected: boolean;
  defaultImagePath: string;
  hoverImagePath: string;
  clickedImagePath: string;
  disabledImagePath: string;
  selectedImagePath: string;
  onClick: () => void;
}

const ParellogramToggleImageButton = ({
  isDisabled,
  isSelected,
  defaultImagePath,
  hoverImagePath,
  clickedImagePath,
  disabledImagePath,
  selectedImagePath,
  onClick,
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = () => {
    if (!isDisabled) {
      setIsClicked(true);
    }
  };

  const handleMouseUp = () => {
    if (!isDisabled) {
      setIsClicked(false);
      onClick();
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled) {
      setIsClicked(false);
      setIsHovered(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isDisabled) {
      setIsHovered(true);
    }
  };

  return (
    <button
      className={
        isDisabled
          ? "parellogram-toggle-image-button-disabled"
          : "parellogram-toggle-image-button"
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      disabled={isDisabled}
    >
      <img
        src={
          isDisabled
            ? disabledImagePath
            : isSelected
            ? selectedImagePath
            : isClicked
            ? clickedImagePath
            : isHovered
            ? hoverImagePath
            : defaultImagePath
        }
      />
    </button>
  );
};

export default ParellogramToggleImageButton;
