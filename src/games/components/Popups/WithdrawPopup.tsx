import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import { UIState, setUIState } from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./WithdrawPopup.css";

interface Props {
  isWithdraw: boolean;
}

const WithdrawPopup = ({ isWithdraw }: Props) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");

  const onClickConfirm = () => {
    console.log(amount);
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  return (
    <div className="withdraw-popup-container">
      <div className="withdraw-popup-mask"></div>
      <div className="withdraw-popup-main-container">
        <img src={background} className="withdraw-popup-main-background" />
        <p className="withdraw-popup-title-text">
          {isWithdraw ? "Withdraw" : "Deposit"}
        </p>
        <p className="withdraw-popup-amount-text">amount</p>
        <div className="withdraw-popup-amount-contianer">
          <img
            src={amountBackground}
            className="withdraw-popup-amount-background"
          />
          <input
            type="number"
            className="withdraw-popup-amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="withdraw-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default WithdrawPopup;
