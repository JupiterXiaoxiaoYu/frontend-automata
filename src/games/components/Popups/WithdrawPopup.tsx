import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import {
  UIState,
  selectNonce,
  selectUIState,
  setConfirmPopupInfo,
  setUIState,
} from "../../../data/automata/properties";
import {
  getResourceIconPath,
  ResourceType,
  getNumberAbbr,
} from "../../../data/automata/models";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./WithdrawPopup.css";
import { getWithdrawTransactionCommandArray } from "../../rpc";
import { sendTransaction, useWalletContext } from "zkwasm-minirollup-browser";
import { selectResource } from "../../../data/automata/resources";

interface Props {
  isWithdraw: boolean;
}

const WithdrawPopup = ({ isWithdraw }: Props) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const { l1Account, l2Account, deposit } = useWalletContext();
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
            l1Account!
          ),
          prikey: l2Account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(
            setConfirmPopupInfo({
              confirmPopupInfo: {
                title: "Withdraw Success",
                description: "Hash Number : (TBD)",
                isError: false,
              },
            })
          );
          dispatch(setUIState({ uIState: UIState.ConfirmPopup }));
        }
      });
    } catch (e) {
      console.log("Error at withdraw " + e);
    }
  };

  const onDeposit = (amount: string) => {
    dispatch(setUIState({ uIState: UIState.DepositPopupLoading }));
    deposit({
      tokenIndex: 0,
      amount: Number(BigInt(amount)),
    })
      .then((result) => {
        dispatch(
          setConfirmPopupInfo({
            confirmPopupInfo: {
              title: "Deposit Success",
              description: `Hash Number : (TBD)${result.hash}`,
              isError: false,
            },
          })
        );
        dispatch(setUIState({ uIState: UIState.ConfirmPopup }));
        setErrorMessage("");
      })
      .catch((error) => {
        dispatch(
          setConfirmPopupInfo({
            confirmPopupInfo: {
              title: "Deposit Fail",
              description: error.message,
              isError: true,
            },
          })
        );
        dispatch(setUIState({ uIState: UIState.ConfirmPopup }));
      });
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
      onDeposit(amountString);
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
