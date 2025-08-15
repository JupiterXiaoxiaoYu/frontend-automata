import React, { useState } from "react";
import background from "../image/backgrounds/player_info_level_frame.png";
import "./PlayerInfoLevelDisplay.css";
import PlayerInfoHover from "./PlayerInfoHover";

interface Props {
  icon: string;
  title: string;
  amount: number;
  interestRate: number;
  description: string;
  fontSize: number;
}

const PlayerInfoLevelDisplay = ({
  icon,
  title,
  amount,
  interestRate,
  description,
  fontSize,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div className="player-info-level-display-container">
      <img src={background} className="player-info-level-display-background" />
      <img src={icon} className="player-info-level-display-icon" />
      <p
        className="player-info-level-display-title-text"
        style={{
          fontSize: fontSize,
        }}
      >
        {title}
      </p>
      <p
        className="player-info-level-display-amount-text"
        style={{
          fontSize: fontSize,
        }}
      >
        {amount}
      </p>
      <p
        className="player-info-level-display-interest-rate-text"
        style={{
          fontSize: fontSize,
        }}
      >
        Current Interest Rate: {interestRate}%
      </p>
      <div
        className="player-info-level-display-hover-range"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovering && (
        <div className="player-info-level-display-hover-container">
          <PlayerInfoHover
            description={description}
            fontSize={fontSize * 1.2}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerInfoLevelDisplay;
