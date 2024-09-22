import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import GuidePopup from "./Popups/GuidePopup";
import WithdrawPopup from "./Popups/WithdrawPopup";
import UpgradePopup from "./Popups/UpgradePopup";
import { UIState, selectUIState } from "../../data/automata/properties";
import "./Popups.css";
import UnlockPopup from "./Popups/UnlockPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);
  const showGuidePopup = uIState == UIState.Guide;
  const showWithdrawPopup =
    uIState == UIState.WithdrawPopup || uIState == UIState.DepositPopup;
  const showUpgradePopup = uIState == UIState.UpgradePopup;
  const showUnlockPopup = uIState == UIState.UnlockPopup;

  return (
    <>
      {showGuidePopup && <GuidePopup />}
      {showWithdrawPopup && (
        <WithdrawPopup isWithdraw={uIState == UIState.WithdrawPopup} />
      )}
      {showUpgradePopup && <UpgradePopup />}
      {showUnlockPopup && <UnlockPopup />}
    </>
  );
};

export default Popups;
