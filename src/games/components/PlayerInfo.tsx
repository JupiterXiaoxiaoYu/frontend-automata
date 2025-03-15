import React from "react";
import "./PlayerInfo.css";
import { useAppSelector } from "../../app/hooks";
import { addressAbbreviation } from "../../utils/address";
import level_icon from "../images/backgrounds/player_lv.png";
import energy_icon from "../images/backgrounds/player_energy.png";
import xp_icon from "../images/backgrounds/player_xp.png";
import {
  selectEnergy,
  selectExp,
  selectLevel,
} from "../../data/automata/properties";
import PlayerInfoDisplay from "./PlayerInfoDisplay";
import { expToLevelUp } from "../../data/automata/models";
import PlayerInfoLevelDisplay from "./PlayerInfoLevelDisplay";

const PlayerInfo = () => {
  const level = useAppSelector(selectLevel);
  const exp = useAppSelector(selectExp);
  const energy = useAppSelector(selectEnergy);

  return (
    <div className="player-info-container">
      <div className="player-info-level-container">
        <PlayerInfoLevelDisplay
          icon={level_icon}
          title={"level"}
          amount={level}
          interestRate={0.01 * level}
          description={
            "Increasing Rockets Spawn and Interest Rate When Leveling Up"
          }
        />
      </div>
      <div className="player-info-xp-container">
        <PlayerInfoDisplay
          icon={xp_icon}
          title={"xp"}
          amount={exp}
          description={`${expToLevelUp - exp} Exp Before Leveling Up`}
        />
      </div>
      <div className="player-info-energy-container">
        <PlayerInfoDisplay
          icon={energy_icon}
          title={"energy"}
          amount={energy}
          description={"Automatas Use Energy To Operate"}
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
