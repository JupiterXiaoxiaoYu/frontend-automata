import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import {
  UIState,
  selectCurrentCost,
  selectNonce,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./NewProgramPopup.css";
import {
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";
import { selectResource } from "../../../data/automata/resources";
import { getNewProgramTransactionCommandArray } from "../../rpc";
import { useWalletContext, sendTransaction } from "zkwasm-minirollup-browser";

const NewProgramPopup = () => {
  const dispatch = useAppDispatch();
  const currentCost = useAppSelector(selectCurrentCost);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));
  const { l2Account } = useWalletContext();
  const nonce = useAppSelector(selectNonce);

  const onClickConfirm = () => {
    newProgram();
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  function newProgram() {
    try {
      dispatch(setUIState({ uIState: UIState.Loading }));
      dispatch(
        sendTransaction({
          cmd: getNewProgramTransactionCommandArray(nonce),
          prikey: l2Account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(setUIState({ uIState: UIState.PlayNewProgramAnimation }));
        }
      });
    } catch (e) {
      console.log("Error at upgrade bot " + e);
    }
  }

  return (
    <div className="new-program-popup-container">
      <div onClick={onClickCancel} className="new-program-popup-mask" />
      <div className="new-program-popup-main-container">
        <img src={background} className="new-program-popup-main-background" />
        <p className="new-program-popup-title-text">New Program</p>
        <p className="new-program-popup-subtitle-text">Cost</p>
        <div className="new-program-popup-cost-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="new-program-popup-cost-icon"
          />
          <p className="new-program-popup-cost-text">{currentCost}</p>
          <img
            src={amountBackground}
            className="new-program-popup-cost-background"
          />
        </div>
        <div className="new-program-popup-confirm-button">
          <ConfirmButton
            isDisabled={titaniumCount < currentCost}
            onClick={onClickConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default NewProgramPopup;
