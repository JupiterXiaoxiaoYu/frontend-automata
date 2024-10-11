import React from "react";
import "./AttributeHover.css";
import background from "../images/backgrounds/hover_frame.png";

interface Props {
  title: string;
  description: string;
}

const AttributeHover = ({ title, description }: Props) => {
  return (
    <div className="attribute-hover-container">
      <img src={background} className="attribute-hover-background" />
      <p className="attribute-hover-title-text">{title}</p>
      <p className="attribute-hover-context-text">{description}</p>
    </div>
  );
};

export default AttributeHover;
