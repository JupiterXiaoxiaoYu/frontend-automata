import React, { useState } from "react";
import background from "../image/backgrounds/bottom_bar.png";
import { getNumberAbbr } from "../../data/models";
import "./ResourceDisplay.css";
import ResourceHover from "./ResourceHover";

interface Props {
  iconImagePath: string;
  amount: number;
  title: string;
  description: string;
  fontSize: number;
}

const ResourceDisplay = ({
  iconImagePath,
  amount,
  title,
  description,
  fontSize,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div className="resource-display-container">
      <img src={background} className="resource-display-background" />
      <img src={iconImagePath} className="resource-display-image" />
      <p
        className="resource-display-text"
        title={amount.toLocaleString()}
        style={{ fontSize: fontSize }}
      >
        {getNumberAbbr(amount)}
      </p>
      <div
        className="resource-display-hover-range"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovering && (
        <ResourceHover
          title={title}
          description={description}
          fontSize={fontSize * 1.2}
        />
      )}
    </div>
  );
};

export default ResourceDisplay;
