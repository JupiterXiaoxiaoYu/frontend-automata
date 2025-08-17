import React, { useEffect, useRef, useState } from "react";
import "./ProgramFilterButton.css";
import selectingBackground from "../image/backgrounds/tab_select.png";
import background from "../image/backgrounds/tab.png";

interface Props {
  isSelected: boolean;
  text?: string | null;
  iconImagePath?: string | null;
  onClick: () => void;
}

const ProgramFilterButton = ({
  isSelected,
  text = null,
  iconImagePath = null,
  onClick,
}: Props) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

  const adjustSize = () => {
    if (containerRef.current) {
      setFontSize(containerRef.current.offsetHeight / 2.5);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [containerRef.current]);

  return (
    <div
      className="program-filter-bar-filter-container"
      onClick={onClick}
      ref={containerRef}
    >
      <img
        src={selectingBackground}
        className="program-filter-bar-filter-selecting-background"
      />
      {isSelected ? null : (
        <img
          src={background}
          className="program-filter-bar-filter-background"
        />
      )}
      {text && (
        <p className="program-filter-bar-filter-text" style={{ fontSize }}>
          {text}
        </p>
      )}
      {iconImagePath && (
        <img src={iconImagePath} className="program-filter-bar-filter-icon" />
      )}
    </div>
  );
};

export default ProgramFilterButton;
