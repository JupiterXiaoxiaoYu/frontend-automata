import React from "react";
import background from "../images/backgrounds/bottom_bar.png";
import { getNumberAbbr } from "../../data/automata/models";
import "./AttributeDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const AttributeDisplay = ({ iconImagePath, amount }: Props) => {
  return (
    <div className="attribute-display-container">
      <img src={background} className="attribute-display-background" />
      <img src={iconImagePath} className="attribute-display-image" />
      <p className="attribute-display-text">{getNumberAbbr(amount)}</p>
    </div>
  );
};

export default AttributeDisplay;
