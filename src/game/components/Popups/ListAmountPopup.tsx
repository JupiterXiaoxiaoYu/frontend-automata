import { useState } from "react";
import background from "../../image/backgrounds/withdraw_frame.png";
import amountBackground from "../../image/backgrounds/withdraw_amount_background.png";
import "./ListAmountPopup.css";
import { ProgramModel } from "../../../data/models";
import ConfirmButton from "../../script/button/ConfirmButton";

interface Props {
  minBidAmount: number;
  maxBidAmount: number;
  program: ProgramModel;
  onConfirmListAmount: (amount: number, program: ProgramModel) => void;
  onCancelList: () => void;
}

const ListAmountPopup = ({
  minBidAmount,
  maxBidAmount,
  program,
  onConfirmListAmount,
  onCancelList,
}: Props) => {
  const [amountString, setAmountString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "") {
      setAmountString("");
      return;
    }

    if (/^0\d+/.test(value)) {
      value = String(Number(value));
    }

    const num = Number(value);
    if (Number.isInteger(num) && num >= 0 && num <= maxBidAmount) {
      setAmountString(value);
    }
  };

  const onClickConfirm = () => {
    const amount = Number(amountString);
    if (amount > maxBidAmount || amount < minBidAmount) {
      setErrorMessage("Please enter a valid amount");
    } else {
      onConfirmListAmount(amount, program);
    }
  };

  const onClickCancel = () => {
    onCancelList();
  };

  return (
    <div className="list-amount-popup-container">
      <div onClick={onClickCancel} className="list-amount-popup-mask" />
      <div className="list-amount-popup-main-container">
        <img src={background} className="list-amount-popup-main-background" />
        <p className="list-amount-popup-title-text">Price</p>
        {errorMessage != "" && (
          <p className="list-amount-popup-amount-text">{errorMessage}</p>
        )}
        <div className="list-amount-popup-amount-container">
          <img
            src={amountBackground}
            className="list-amount-popup-amount-background"
          />
          <input
            type="number"
            className="list-amount-popup-amount-input"
            value={amountString}
            onKeyDown={(e) => {
              if (["e", "E", "-", "+", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={onInputChange}
          />
        </div>
        <div className="list-amount-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} isDisabled={false} />
        </div>
      </div>
    </div>
  );
};

export default ListAmountPopup;
