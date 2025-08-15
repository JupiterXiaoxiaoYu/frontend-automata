import React from "react";
import "./PlayerInfoHover.css";
import background from "../image/backgrounds/hover_frame.png";

interface Props {
  description: string;
  fontSize: number;
}

const PlayerInfoHover = ({ description, fontSize }: Props) => {
  return (
    <div className="player-info-hover-container">
      <img src={background} className="player-info-hover-background" />
      <p
        className="player-info-hover-context-text"
        style={{
          fontSize: fontSize,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default PlayerInfoHover;
