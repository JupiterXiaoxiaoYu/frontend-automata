import React from "react";
import background from "../images/backgrounds/top_bar.png";
import { getNumberAbbr } from "../../data/automata/models";
import "./ResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const ResourceDisplay = ({ iconImagePath, amount }: Props) => {
  return (
    <div className="resource-display-container">
      <img src={background} className="resource-display-background" />
      <img src={iconImagePath} className="resource-display-image" />
      <p className="resource-display-text">{getNumberAbbr(amount)}</p>
    </div>
  );
};

export default ResourceDisplay;
