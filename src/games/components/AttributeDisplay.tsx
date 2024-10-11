import React, { useState } from "react";
import background from "../images/backgrounds/bottom_bar.png";
import { getNumberAbbr } from "../../data/automata/models";
import "./AttributeDisplay.css";
import AttributeHover from "./AttributeHover";

interface Props {
  iconImagePath: string;
  amount: number;
  title: string;
  description: string;
}

const AttributeDisplay = ({
  iconImagePath,
  amount,
  title,
  description,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div className="attribute-display-container">
      <img src={background} className="attribute-display-background" />
      <img src={iconImagePath} className="attribute-display-image" />
      <p className="attribute-display-text">{getNumberAbbr(amount)}</p>
      <div
        className="attribute-display-hover-range"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovering && (
        <p className="resource-display-hover-container">
          <AttributeHover title={title} description={description} />
        </p>
      )}
    </div>
  );
};

export default AttributeDisplay;
