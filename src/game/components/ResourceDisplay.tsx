import React, { useState } from "react";
import background from "../images/backgrounds/bottom_bar.png";
import { getNumberAbbr } from "../../data/models";
import "./ResourceDisplay.css";
import ResourceHover from "./ResourceHover";

interface Props {
  iconImagePath: string;
  amount: number;
  title: string;
  description: string;
}

const ResourceDisplay = ({
  iconImagePath,
  amount,
  title,
  description,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div className="resource-display-container">
      <img src={background} className="resource-display-background" />
      <img src={iconImagePath} className="resource-display-image" />
      <p className="resource-display-text" title={amount.toLocaleString()}>
        {getNumberAbbr(amount)}
      </p>
      <div
        className="resource-display-hover-range"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovering && (
        <div className="resource-display-hover-container">
          <ResourceHover title={title} description={description} />
        </div>
      )}
    </div>
  );
};

export default ResourceDisplay;
