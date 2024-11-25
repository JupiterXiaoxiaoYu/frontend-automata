import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import {
  UIState,
  selectNonce,
  selectUIState,
  setUIState,
} from "../../../data/automata/properties";
import {
  getResourceIconPath,
  ResourceType,
  getNumberAbbr,
} from "../../../data/automata/models";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./WithdrawPopup.css";
import { sendTransaction } from "../../request";
import { getWithdrawTransactionCommandArray } from "../../rpc";
import { AccountSlice } from "zkwasm-minirollup-rpc";
import { selectResource } from "../../../data/automata/resources";

interface Props {
  isWithdraw: boolean;
}

const WithdrawPopup = ({ isWithdraw }: Props) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const [amountString, setAmountString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));

  const withdraw = (amount: number) => {
    try {
      dispatch(setUIState({ uIState: UIState.WithdrawPopupLoading }));
      dispatch(
        sendTransaction({
          cmd: getWithdrawTransactionCommandArray(
            nonce,
            BigInt(amount),
            l1account!
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
        }
      });
    } catch (e) {
      console.log("Error at withdraw " + e);
    }
  };

  const deposit = (amount: string) => {
    try {
      dispatch(setUIState({ uIState: UIState.DepositPopupLoading }));
      dispatch(
        AccountSlice.depositAsync({
          amount: Number(BigInt(amount)),
          l2account: l2account!,
          l1account: l1account!,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
          setErrorMessage("");
        } else if (AccountSlice.depositAsync.rejected.match(action)) {
          if (action.error.message == null) {
            setErrorMessage("Unknown Error.");
          } else if (action.error.message.startsWith("user rejected action")) {
            setErrorMessage("user rejected action");
          } else {
            setErrorMessage(action.error.message);
          }
          dispatch(setUIState({ uIState: UIState.DepositPopup }));
        }
      });
    } catch (e) {
      console.log("Error at deposit uncaught: ", e);
    }
  };

  const onClickConfirm = () => {
    const amount = Number(amountString);
    if (isWithdraw) {
      if (amount > titaniumCount) {
        setErrorMessage("Not Enough Titanium");
      } else {
        setErrorMessage("");
        withdraw(amount);
      }
    } else {
      // case of deposit
      deposit(amountString);
    }
  };

  const onClickCancel = () => {
    if (
      uiState != UIState.WithdrawPopupLoading &&
      uiState != UIState.DepositPopupLoading
    ) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="withdraw-popup-container">
      <div onClick={onClickCancel} className="withdraw-popup-mask" />
      <div className="withdraw-popup-main-container">
        <img src={background} className="withdraw-popup-main-background" />
        <p className="withdraw-popup-title-text">
          {isWithdraw ? "Withdraw" : "Deposit"}
        </p>
        <div className="withdraw-popup-titanium-resource-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="withdraw-popup-titanium-resource-display-image"
          />
          <p className="withdraw-popup-titanium-resource-display-text">
            {getNumberAbbr(titaniumCount)}
          </p>
        </div>
        {errorMessage != "" && (
          <p className="withdraw-popup-amount-text">{errorMessage}</p>
        )}
        <div className="withdraw-popup-amount-container">
          <img
            src={amountBackground}
            className="withdraw-popup-amount-background"
          />
          <input
            type="number"
            className="withdraw-popup-amount-input"
            value={amountString}
            onChange={(e) => setAmountString(e.target.value)}
            min="0"
          />
        </div>
        <div className="withdraw-popup-confirm-button">
          <ConfirmButton isDisabled={false} onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default WithdrawPopup;
