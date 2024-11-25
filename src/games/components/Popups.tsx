import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import GuidePopup from "./Popups/GuidePopup";
import WithdrawPopup from "./Popups/WithdrawPopup";
import UpgradePopup from "./Popups/UpgradePopup";
import { UIState, selectUIState } from "../../data/automata/properties";
import "./Popups.css";
import UnlockPopup from "./Popups/UnlockPopup";
import NewProgramPopup from "./Popups/NewProgramPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);
  const showGuidePopup = uIState == UIState.Guide;
  const showWithdrawPopup =
    uIState == UIState.WithdrawPopup || uIState == UIState.WithdrawPopupLoading;
  const showDepositPopup =
    uIState == UIState.DepositPopup || uIState == UIState.DepositPopupLoading;
  const showUpgradePopup = uIState == UIState.UpgradePopup;
  const showUnlockPopup = uIState == UIState.UnlockPopup;
  const showNewProgramPopup = uIState == UIState.NewProgramPopup;

  return (
    <>
      {showGuidePopup && <GuidePopup />}
      {showWithdrawPopup && <WithdrawPopup isWithdraw={true} />}
      {showDepositPopup && <WithdrawPopup isWithdraw={false} />}

      {showUpgradePopup && <UpgradePopup />}
      {showUnlockPopup && <UnlockPopup />}
      {showNewProgramPopup && <NewProgramPopup />}
    </>
  );
};

export default Popups;
