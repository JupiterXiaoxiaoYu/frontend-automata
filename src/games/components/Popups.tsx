import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import GuidePopup from "./Popups/GuidePopup";
import WithdrawPopup from "./Popups/WithdrawPopup";
import UpgradePopup from "./Popups/UpgradePopup";
import { UIStateType, selectUIState } from "../../data/automata/properties";
import "./Popups.css";
import UnlockPopup from "./Popups/UnlockPopup";
import NewProgramPopup from "./Popups/NewProgramPopup";
import ConfirmPopup from "./Popups/ConfirmPopup";
import RocketPopup from "./Popups/RocketPopup";
import RebootPopup from "./Popups/RebootPopup";
import CollectInterestPopup from "./Popups/CollectInterestPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);

  return (
    <>
      {uIState.type == UIStateType.GuidePopup && <GuidePopup />}
      {uIState.type == UIStateType.WithdrawPopup && (
        <WithdrawPopup isWithdraw={true} />
      )}
      {uIState.type == UIStateType.DepositPopup && (
        <WithdrawPopup isWithdraw={false} />
      )}
      {uIState.type == UIStateType.UpgradePopup && <UpgradePopup />}
      {uIState.type == UIStateType.UnlockPopup && <UnlockPopup />}
      {uIState.type == UIStateType.RebootPopup && <RebootPopup />}
      {uIState.type == UIStateType.NewProgramPopup && <NewProgramPopup />}
      {uIState.type == UIStateType.ConfirmPopup && (
        <ConfirmPopup confirmPopupInfo={uIState.confirmPopupInfo} />
      )}
      {uIState.type == UIStateType.CollectInterestPopup && (
        <CollectInterestPopup />
      )}
      {uIState.type == UIStateType.RocketPopup && <RocketPopup />}
    </>
  );
};

export default Popups;
