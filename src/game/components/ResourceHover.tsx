import React from "react";
import "./ResourceHover.css";
import background from "../image/backgrounds/hover_frame.png";

interface Props {
  title: string;
  description: string;
}

const ResourceHover = ({ title, description }: Props) => {
  return (
    <div className="resource-hover-container">
      <img src={background} className="resource-hover-background" />
      <p className="resource-hover-title-text">{title}</p>
      <p className="resource-hover-context-text">{description}</p>
    </div>
  );
};

export default ResourceHover;
