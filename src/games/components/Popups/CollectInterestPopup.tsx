import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import OkButton from "../Buttons/OkButton";
import {
  UIState,
  selectInterest,
  selectNonce,
  selectUIState,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./CollectInterestPopup.css";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { sendTransaction, queryState } from "../../request";
import { getRedeemTransactionCommandArray } from "../../rpc";

const COLLECT_INTEREST_BOUNTY_PARAM = 7;

const CollectInterestPopup = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const uIState = useAppSelector(selectUIState);
  const interest = useAppSelector(selectInterest);

  const onClickConfirm = () => {
    if (uIState == UIState.CollectInterestPopup) {
      dispatch(setUIState({ uIState: UIState.CollectInterestPopupLoading }));
      dispatch(
        sendTransaction({
          cmd: getRedeemTransactionCommandArray(
            nonce,
            COLLECT_INTEREST_BOUNTY_PARAM
          ),
          prikey: l2account!.getPrivateKey(),
        })
      ).then((action) => {
        if (
          sendTransaction.fulfilled.match(action) ||
          sendTransaction.rejected.match(action)
        ) {
          dispatch(queryState({ prikey: l2account!.getPrivateKey()})).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
              }
            }
          );
        }
      });
    }
  };

  const onClickCancel = () => {
    if (uIState == UIState.CollectInterestPopup) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="collect-interest-popup-container">
      <div onClick={onClickCancel} className="collect-interest-popup-mask" />
      <div className="collect-interest-popup-main-container">
        <img
          src={background}
          className="collect-interest-popup-main-background"
        />
        <p className={"collect-interest-popup-title-text"}>Collect Interest</p>
        <p className="collect-interest-popup-description-text">
          You will earn {Math.max(0, interest - 100)} titanium. <br />
          (include 100 processing fee)
        </p>
        <div className="collect-interest-popup-ok-button">
          <OkButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default CollectInterestPopup;
