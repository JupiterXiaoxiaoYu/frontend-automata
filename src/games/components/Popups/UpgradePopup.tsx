import React, { useState } from "react";
import background from "../../images/backgrounds/upgrade_frame.png";
// import amountBackground from "../../images/backgrounds/upgrade_amount_background.png";
import {
  UIState,
  selectCurrentCost,
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
  ResourceType,
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
import { AccountSlice } from "zkwasm-minirollup-browser";
import { sendTransaction } from "../../request";
import { getUpgradeBotTransactionCommandArray } from "../../rpc";
import { selectResource } from "../../../data/automata/resources";

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
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const currentCost = useAppSelector(selectCurrentCost);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));

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
    let attrIndex = 0n;
    if (upgradeState == UpgradeState.Speed) {
      attrIndex = 1n;
    } else if (upgradeState == UpgradeState.Efficiency) {
      attrIndex = 2n;
    } else if (upgradeState == UpgradeState.Productivity) {
      attrIndex = 3n;
    }
    try {
      dispatch(setUIState({ uIState: UIState.Loading }));
      dispatch(
        sendTransaction({
          cmd: getUpgradeBotTransactionCommandArray(
            nonce,
            selectedCreatureIndexForRequestEncode,
            attrIndex
          ),
          prikey: l2account!.getPrivateKey(),
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
            <span style={{ color: "rgb(85, 221, 85)" }}>+1</span>
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
            <span style={{ color: "rgb(85, 221, 85)" }}>+1</span>
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
            <span style={{ color: "rgb(85, 221, 85)" }}>+1</span>
          </p>
        </div>
        <div className="upgrade-popup-confirm-button">
          <UpgradeConfirmButton
            isDisable={
              titaniumCount < currentCost || upgradeState == UpgradeState.None
            }
            onClick={onClickConfirm}
          />
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="upgrade-popup-button-icon"
          />
          <p className="upgrade-popup-button-text">{currentCost}</p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;
