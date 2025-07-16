import React, { useState } from "react";
import background from "../../image/backgrounds/withdraw_frame.png";
import amountBackground from "../../image/backgrounds/withdraw_amount_background.png";
import {
  UIStateType,
  selectCurrentCost,
  selectNonce,
  setUIState,
} from "../../../data/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./NewProgramPopup.css";
import { getResourceIconPath, ResourceType } from "../../../data/models";
import { selectResource } from "../../../data/resources";
import { getNewProgramTransactionCommandArray } from "../../rpc";
import { useWalletContext, sendTransaction } from "zkwasm-minirollup-browser";
import { setLoadingType, LoadingType } from "../../../data/errors";
import OrangeButton from "../../script/button/OrangeButton";

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
    dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
  };

  function newProgram() {
    try {
      dispatch(setLoadingType(LoadingType.Default));
      dispatch(
        sendTransaction({
          cmd: getNewProgramTransactionCommandArray(nonce),
          prikey: l2Account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(
            setUIState({
              uIState: { type: UIStateType.PlayNewProgramAnimation },
            })
          );
          dispatch(setLoadingType(LoadingType.None));
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
          <OrangeButton
            text={"Confirm"}
            onClick={onClickConfirm}
            isDisabled={titaniumCount < currentCost}
            fontSizeRatio={0.7}
          />
        </div>
      </div>
    </div>
  );
};

export default NewProgramPopup;
