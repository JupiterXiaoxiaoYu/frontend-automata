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
  imageWidth: number;
  imageHeight: number;
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
  imageWidth,
  imageHeight,
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
    <div className="parellogram-toggle-image-button-container">
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
        className="parellogram-toggle-image"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      />
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
      />
    </div>
  );
};

export default ParellogramToggleImageButton;
