import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import {
  UIState,
  selectCurrentCost,
  selectNonce,
  selectUIState,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./RebootPopup.css";
import {
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";
import { selectResource } from "../../../data/automata/resources";
import { queryState, sendTransaction } from "../../request";
import { getInstallProgramTransactionCommandArray } from "../../rpc";
import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  clearRebootCreature,
  selectSelectedCreature,
  selectSelectedCreatureListIndex,
} from "../../../data/automata/creatures";

const RebootPopup = () => {
  const dispatch = useAppDispatch();
  const currentCost = useAppSelector(selectCurrentCost);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );

  const onClickConfirm = () => {
    if (uIState == UIState.RebootPopup) {
      // bugs here, after creating a new creature, the list will refresh unproperly.
      // fix it after UI done polishing creature list since it may change the layout of the creating creature.
      dispatch(setUIState({ uIState: UIState.RebootPopupLoading }));
      dispatch(
        sendTransaction({
          cmd: getInstallProgramTransactionCommandArray(
            nonce,
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            false
          ),
          prikey: l2account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ prikey: l2account!.getPrivateKey()})).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              } else {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              }
            }
          );
        } else if (sendTransaction.rejected.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
        }
      });
    }
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Reboot }));
  };

  return (
    <div className="reboot-popup-container">
      <div onClick={onClickCancel} className="reboot-popup-mask" />
      <div className="reboot-popup-main-container">
        <img src={background} className="reboot-popup-main-background" />
        <p className="reboot-popup-title-text">Reboot</p>
        <p className="reboot-popup-subtitle-text">Cost</p>
        <div className="reboot-popup-cost-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="reboot-popup-cost-icon"
          />
          <p className="reboot-popup-cost-text">{currentCost}</p>
          <img
            src={amountBackground}
            className="reboot-popup-cost-background"
          />
        </div>
        <div className="reboot-popup-confirm-button">
          <ConfirmButton
            isDisabled={titaniumCount < currentCost}
            onClick={onClickConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default RebootPopup;
