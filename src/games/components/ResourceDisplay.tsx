import React, { useState } from "react";
import background from "../images/backgrounds/top_bar.png";
import { getNumberAbbr } from "../../data/automata/models";
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
    <div
      className="resource-display-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={background} className="resource-display-background" />
      <img src={iconImagePath} className="resource-display-image" />
      <p className="resource-display-text">{getNumberAbbr(amount)}</p>
      {isHovering && (
        <p className="resource-display-hover-container">
          <ResourceHover title={title} description={description} />
        </p>
      )}
    </div>
  );
};

export default ResourceDisplay;
