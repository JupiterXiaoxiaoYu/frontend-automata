import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import GuidePopup from "./Popups/GuidePopup";
import WithdrawPopup from "./Popups/WithdrawPopup";
import UpgradePopup from "./Popups/UpgradePopup";
import {
  UIState,
  UIStateType,
  selectConfirmPopupInfo,
  selectUIState,
} from "../../data/automata/properties";
import "./Popups.css";
import UnlockPopup from "./Popups/UnlockPopup";
import NewProgramPopup from "./Popups/NewProgramPopup";
import ConfirmPopup from "./Popups/ConfirmPopup";
import RocketPopup from "./Popups/RocketPopup";
import RebootPopup from "./Popups/RebootPopup";
import CollectInterestPopup from "./Popups/CollectInterestPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);
  const showGuidePopup = uIState.type == UIStateType.GuidePopup;
  const showWithdrawPopup = uIState.type == UIStateType.WithdrawPopup;
  const showDepositPopup = uIState.type == UIStateType.DepositPopup;
  const showUpgradePopup = uIState.type == UIStateType.UpgradePopup;
  const showUnlockPopup = uIState.type == UIStateType.UnlockPopup;
  const showRebootPopup = uIState.type == UIStateType.RebootPopup;
  const showNewProgramPopup = uIState.type == UIStateType.NewProgramPopup;
  const showConfirmPopup = uIState.type == UIStateType.ConfirmPopup;
  const confirmPopupInfo = useAppSelector(selectConfirmPopupInfo);
  const showCollectInterestPopup =
    uIState.type == UIStateType.CollectInterestPopup;
  const showRocketPopup = uIState.type == UIStateType.RocketPopup;

  return (
    <>
      {showGuidePopup && <GuidePopup />}
      {showWithdrawPopup && <WithdrawPopup isWithdraw={true} />}
      {showDepositPopup && <WithdrawPopup isWithdraw={false} />}

      {showUpgradePopup && <UpgradePopup />}
      {showUnlockPopup && <UnlockPopup />}
      {showRebootPopup && <RebootPopup />}
      {showNewProgramPopup && <NewProgramPopup />}
      {showConfirmPopup && <ConfirmPopup confirmPopupInfo={confirmPopupInfo} />}
      {showCollectInterestPopup && <CollectInterestPopup />}
      {showRocketPopup && <RocketPopup />}
    </>
  );
};

export default Popups;
