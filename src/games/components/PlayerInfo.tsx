import React from "react";
import "./PlayerInfo.css";
import { useAppSelector } from "../../app/hooks";
import { addressAbbreviation } from "../../utils/address";
import info_background from "../images/backgrounds/player_info_background.png";
import level_icon from "../images/backgrounds/player_lv.png";
import energy_icon from "../images/backgrounds/player_energy.png";
import xp_icon from "../images/backgrounds/player_xp.png";
import {
  selectEnergyInfo,
  selectExpInfo,
  selectLevelInfo,
} from "../../data/automata/properties";

const PlayerInfo = () => {
  const level = useAppSelector(selectLevelInfo);
  const exp = useAppSelector(selectExpInfo);
  const energy = useAppSelector(selectEnergyInfo);

  return (
    <div className="player-info-container">
      <div className="player-info-level-container">
        <img src={info_background} className="player-info-background" />
        <img src={level_icon} className="player-info-icon" />
        <p className="player-info-title-text">level</p>
        <p className="player-info-amount-text">{level}</p>
      </div>
      <div className="player-info-energy-container">
        <img src={info_background} className="player-info-background" />
        <img src={energy_icon} className="player-info-icon" />
        <p className="player-info-title-text">energy</p>
        <p className="player-info-amount-text">{energy}</p>
      </div>
      <div className="player-info-xp-container">
        <img src={info_background} className="player-info-background" />
        <img src={xp_icon} className="player-info-icon" />
        <p className="player-info-title-text">xp</p>
        <p className="player-info-amount-text">{exp}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
