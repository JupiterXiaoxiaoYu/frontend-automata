import React from "react";
import "./ResourceHover.css";
import background from "../image/backgrounds/hover_frame.png";

interface Props {
  title: string;
  description: string;
  fontSize: number;
}

const ResourceHover = ({ title, description, fontSize }: Props) => {
  return (
    <div className="resource-hover-container">
      <img src={background} className="resource-hover-background" />
      <p className="resource-hover-title-text" style={{ fontSize: fontSize }}>
        {title}
      </p>
    </div>
  );
};

export default ResourceHover;
