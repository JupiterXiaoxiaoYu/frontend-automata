import React, { useState } from "react";
import background from "../../images/backgrounds/upgrade_frame.png";
// import amountBackground from "../../images/backgrounds/upgrade_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import { UIState, setUIState } from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./UpgradePopup.css";
import UpgradeConfirmButton from "../Buttons/UpgradeConfirmButton";
import UpgradeCancelButton from "../Buttons/UpgradeCancelButton";
import UpgradSpeedButton from "../Buttons/UpgradeSpeedButton";
import UpgradEfficiencyButton from "../Buttons/UpgradeEfficiencyButton";
import UpgradProductivityButton from "../Buttons/UpgradeProductivityButton";
import {
  CreatureModel,
  getCreatureIconPath,
} from "../../../data/automata/models";

interface Props {
  creature: CreatureModel;
}
enum UpgradeState {
  None,
  Speed,
  Efficiency,
  Productivity,
}

const UpgradePopup = ({ creature }: Props) => {
  const dispatch = useAppDispatch();
  const [upgradeState, setUpgradeState] = useState(UpgradeState.None);

  const onClickSpeed = () => {
    setUpgradeState(UpgradeState.Speed);
  };

  const onClickEfficiency = () => {
    setUpgradeState(UpgradeState.Efficiency);
  };

  const onClickProductivity = () => {
    setUpgradeState(UpgradeState.Productivity);
  };

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  return (
    <div className="upgrade-popup-container">
      <div className="upgrade-popup-mask"></div>
      <div className="upgrade-popup-main-container">
        <img src={background} className="upgrade-popup-main-background" />
        <p className="upgrade-popup-title-text">{`Level ${1}`}</p>
        <p className="upgrade-popup-bot-name-text">{"COC-3721"}</p>

        <img
          src={getCreatureIconPath(creature.creatureType)}
          className="upgrade-popup-creature-image"
        />

        {/* <img
            src={amountBackground}
            className="upgrade-popup-amount-background"
          /> */}
        <div className="upgrade-popup-speed-button">
          <UpgradSpeedButton
            isSelected={upgradeState == UpgradeState.Speed}
            onClick={onClickSpeed}
          />
          <p className="upgrade-popup-upgrade-title-text">speed</p>
          <p className="upgrade-popup-upgrade-value-text">
            5<span style={{ color: "rgb(85, 221, 85)" }}>+3</span>
          </p>
        </div>
        <div className="upgrade-popup-efficiency-button">
          <UpgradEfficiencyButton
            isSelected={upgradeState == UpgradeState.Efficiency}
            onClick={onClickEfficiency}
          />
          <p className="upgrade-popup-upgrade-title-text">efficiency</p>
          <p className="upgrade-popup-upgrade-value-text">
            5<span style={{ color: "rgb(85, 221, 85)" }}>+3</span>
          </p>
        </div>
        <div className="upgrade-popup-productivity-button">
          <UpgradProductivityButton
            isSelected={upgradeState == UpgradeState.Productivity}
            onClick={onClickProductivity}
          />
          <p className="upgrade-popup-upgrade-title-text">productivity</p>
          <p className="upgrade-popup-upgrade-value-text">
            5<span style={{ color: "rgb(85, 221, 85)" }}>+3</span>
          </p>
        </div>
        <div className="upgrade-popup-confirm-button">
          <UpgradeConfirmButton onClick={onClickConfirm} />
        </div>
        <div className="upgrade-popup-cancel-button">
          <UpgradeCancelButton onClick={onClickCancel} />
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;
