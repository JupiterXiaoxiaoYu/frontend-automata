import React, { useState } from "react";
import background from "../image/backgrounds/player_info_background.png";
import "./PlayerInfoDisplay.css";
import PlayerInfoHover from "./PlayerInfoHover";

interface Props {
  icon: string;
  title: string;
  amount: number;
  description: string;
  fontSize: number;
}

const PlayerInfoDisplay = ({
  icon,
  title,
  amount,
  description,
  fontSize,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div className="player-info-display-container">
      <img src={background} className="player-info-display-background" />
      <img src={icon} className="player-info-display-icon" />
      <p
        className="player-info-display-title-text"
        style={{
          fontSize: fontSize,
        }}
      >
        {title}
      </p>
      <p
        className="player-info-display-amount-text"
        style={{
          fontSize: fontSize,
        }}
      >
        {amount}
      </p>
      <div
        className="player-info-display-hover-range"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovering && (
        <div className="player-info-display-hover-container">
          <PlayerInfoHover
            description={description}
            fontSize={fontSize * 1.2}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerInfoDisplay;
