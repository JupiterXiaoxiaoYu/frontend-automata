import React from "react";
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
  return (
    <div className="program-filter-bar-filter-container" onClick={onClick}>
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
      {text && <p className="program-filter-bar-filter-text">{text}</p>}
      {iconImagePath && (
        <img src={iconImagePath} className="program-filter-bar-filter-icon" />
      )}
    </div>
  );
};

export default ProgramFilterButton;
