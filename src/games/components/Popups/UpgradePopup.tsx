import React, { useState } from "react";
import background from "../../images/backgrounds/upgrade_frame.png";
// import amountBackground from "../../images/backgrounds/upgrade_amount_background.png";
import {
  UIState,
  selectNonce,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./UpgradePopup.css";
import UpgradeConfirmButton from "../Buttons/UpgradeConfirmButton";
import UpgradSpeedButton from "../Buttons/UpgradeSpeedButton";
import UpgradEfficiencyButton from "../Buttons/UpgradeEfficiencyButton";
import UpgradProductivityButton from "../Buttons/UpgradeProductivityButton";
import {
  AttributeType,
  CreatureModel,
  getCreatureIconPath,
  getResourceIconPath,
  resourceTypes,
} from "../../../data/automata/models";
import UpgradePopupResourceDisplay from "./UpgradePopupResourceDisplay";
import Grid from "../Grid";
import {
  selectSelectedAttributes,
  selectSelectedCreature,
  selectSelectedCreatureDiffResources,
  selectSelectedCreatureListIndex,
} from "../../../data/automata/creatures";
import { selectL2Account } from "../../../data/accountSlice";
import { sendTransaction } from "../../request";
import { getUpgradeBotTransactionCommandArray } from "../../rpc";

enum UpgradeState {
  None,
  Speed,
  Efficiency,
  Productivity,
}

const UpgradePopup = () => {
  const dispatch = useAppDispatch();
  const [upgradeState, setUpgradeState] = useState(UpgradeState.None);

  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreatureDiffResources = useAppSelector(
    selectSelectedCreatureDiffResources
  );
  const level = useAppSelector(selectSelectedAttributes(AttributeType.Level));
  const speed = useAppSelector(selectSelectedAttributes(AttributeType.Speed));
  const efficiency = useAppSelector(
    selectSelectedAttributes(AttributeType.Efficiency)
  );
  const productivity = useAppSelector(
    selectSelectedAttributes(AttributeType.Productivity)
  );
  const l2account = useAppSelector(selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );

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
    upgradeBot();
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  function upgradeBot() {
    try {
      dispatch(
        sendTransaction({
          cmd: getUpgradeBotTransactionCommandArray(
            nonce,
            selectedCreatureIndexForRequestEncode
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(setUIState({ uIState: UIState.PlayUpgradeAnimation }));
        }
      });
    } catch (e) {
      console.log("Error at upgrade bot " + e);
    }
  }

  return (
    <div className="upgrade-popup-container">
      <div onClick={onClickCancel} className="upgrade-popup-mask" />
      <div className="upgrade-popup-main-container">
        <img src={background} className="upgrade-popup-main-background" />
        <p className="upgrade-popup-title-text">{`Level ${level}`}</p>
        <p className="upgrade-popup-bot-name-text">{"COC-3721"}</p>

        <img
          src={getCreatureIconPath(selectedCreature.creatureType)}
          className="upgrade-popup-creature-image"
        />
        <div className="upgrade-popup-resources-info-grid">
          <Grid
            elementWidth={52}
            elementHeight={19}
            columnCount={3}
            rowCount={3}
            elements={resourceTypes.map((type, index) => (
              <UpgradePopupResourceDisplay
                key={index}
                iconImagePath={getResourceIconPath(type)}
                amount={selectedCreatureDiffResources[type]}
              />
            ))}
          />
        </div>
        <div className="upgrade-popup-speed-button">
          <UpgradSpeedButton
            isSelected={upgradeState == UpgradeState.Speed}
            onClick={onClickSpeed}
          />
          <p className="upgrade-popup-upgrade-title-text">speed</p>
          <p className="upgrade-popup-upgrade-value-text">
            {speed}
            <span style={{ color: "rgb(85, 221, 85)" }}>+3</span>
          </p>
        </div>
        <div className="upgrade-popup-efficiency-button">
          <UpgradEfficiencyButton
            isSelected={upgradeState == UpgradeState.Efficiency}
            onClick={onClickEfficiency}
          />
          <p className="upgrade-popup-upgrade-title-text">efficiency</p>
          <p className="upgrade-popup-upgrade-value-text">
            {efficiency}
            <span style={{ color: "rgb(85, 221, 85)" }}>+3</span>
          </p>
        </div>
        <div className="upgrade-popup-productivity-button">
          <UpgradProductivityButton
            isSelected={upgradeState == UpgradeState.Productivity}
            onClick={onClickProductivity}
          />
          <p className="upgrade-popup-upgrade-title-text">productivity</p>
          <p className="upgrade-popup-upgrade-value-text">
            {productivity}
            <span style={{ color: "rgb(85, 221, 85)" }}>+3</span>
          </p>
        </div>
        <div className="upgrade-popup-confirm-button">
          <UpgradeConfirmButton
            isDisable={upgradeState == UpgradeState.None}
            onClick={onClickConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;
