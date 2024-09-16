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

// interface Props {}

const UpgradePopup = () => {
  const dispatch = useAppDispatch();
  // const [amount, setAmount] = useState("");

  const onClickSpeed = () => {
    /* */
  };

  const onClickProductivity = () => {
    /* */
  };

  const onClickEfficiency = () => {
    /* */
  };

  const onClickConfirm = () => {
    /* */
  };

  const onClickCancel = () => {
    /* */
  };

  return (
    <div className="upgrade-popup-container">
      <div className="upgrade-popup-mask"></div>
      <div className="upgrade-popup-main-container">
        <img src={background} className="upgrade-popup-main-background" />
        <p className="upgrade-popup-title-text">{`Level ${1}`}</p>
        <p className="upgrade-popup-bot-name-text">{"COC-3721"}</p>

        {/* <img
            src={amountBackground}
            className="upgrade-popup-amount-background"
          /> */}
        <div className="upgrade-popup-speed-button">
          <UpgradSpeedButton onClick={onClickSpeed} />
        </div>
        <div className="upgrade-popup-efficiency-button">
          <UpgradEfficiencyButton onClick={onClickEfficiency} />
        </div>
        <div className="upgrade-popup-productivity-button">
          <UpgradProductivityButton onClick={onClickProductivity} />
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
