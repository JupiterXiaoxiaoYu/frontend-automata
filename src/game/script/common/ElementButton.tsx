import React, { useEffect, useState } from "react";
import "./ElementButton.css";

interface Props {
  isDisabled: boolean;
  defaultElement: JSX.Element;
  hoverElement: JSX.Element;
  clickedElement: JSX.Element;
  disabledElement: JSX.Element;
  removeHoverWhenClicked?: boolean;
  onClick: () => void;
}

const ElementButton = ({
  isDisabled,
  defaultElement,
  hoverElement,
  clickedElement,
  disabledElement,
  removeHoverWhenClicked = false,
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
      if (removeHoverWhenClicked) {
        setIsHovered(false);
      }
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

  useEffect(() => {
    if (isDisabled) {
      setIsClicked(false);
      setIsHovered(false);
    }
  }, [isDisabled]);

  return (
    <button
      className={isDisabled ? "element-button-disabled" : "element-button"}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      disabled={isDisabled}
    >
      {isDisabled
        ? disabledElement
        : isClicked
        ? clickedElement
        : isHovered
        ? hoverElement
        : defaultElement}
    </button>
  );
};

export default ElementButton;
