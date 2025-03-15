import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import GuidePopup from "./Popups/GuidePopup";
import WithdrawPopup from "./Popups/WithdrawPopup";
import UpgradePopup from "./Popups/UpgradePopup";
import {
  UIState,
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
  const showGuidePopup = uIState == UIState.Guide;
  const showWithdrawPopup =
    uIState == UIState.WithdrawPopup || uIState == UIState.WithdrawPopupLoading;
  const showDepositPopup =
    uIState == UIState.DepositPopup || uIState == UIState.DepositPopupLoading;
  const showUpgradePopup = uIState == UIState.UpgradePopup;
  const showUnlockPopup = uIState == UIState.UnlockPopup;
  const showRebootPopup =
    uIState == UIState.RebootPopup || uIState == UIState.RebootPopupLoading;
  const showNewProgramPopup = uIState == UIState.NewProgramPopup;
  const showConfirmPopup = uIState == UIState.ConfirmPopup;
  const confirmPopupInfo = useAppSelector(selectConfirmPopupInfo);
  const showCollectInterestPopup =
    uIState == UIState.CollectInterestPopup ||
    uIState == UIState.CollectInterestPopupLoading;
  const showRocketPopup =
    uIState == UIState.RocketPopup || uIState == UIState.RocketPopupLoading;

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
