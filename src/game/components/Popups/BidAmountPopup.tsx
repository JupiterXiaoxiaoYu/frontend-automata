import { useState } from "react";
import background from "../../image/backgrounds/withdraw_frame.png";
import amountBackground from "../../image/backgrounds/withdraw_amount_background.png";
import {
  getResourceIconPath,
  ProgramModel,
  ResourceType,
} from "../../../data/models";
import "./BidAmountPopup.css";
import OrangeButton from "../../script/button/OrangeButton";

interface Props {
  minBidAmount: number;
  maxBidAmount: number;
  program: ProgramModel;

  onConfirmBidAmount: (amount: number, program: ProgramModel) => void;
  onCancelBid: () => void;
}

const BidAmountPopup = ({
  minBidAmount,
  maxBidAmount,
  program,
  onConfirmBidAmount,
  onCancelBid,
}: Props) => {
  const [amountString, setAmountString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onClickConfirm = () => {
    const amount = Number(amountString);
    if (amount > maxBidAmount || amount < minBidAmount) {
      setErrorMessage("Please enter a valid amount");
    } else {
      onConfirmBidAmount(amount, program);
    }
  };

  const onClickCancel = () => {
    onCancelBid();
  };

  return (
    <div className="bid-amount-popup-container">
      <div onClick={onClickCancel} className="bid-amount-popup-mask" />
      <div className="bid-amount-popup-main-container">
        <img src={background} className="bid-amount-popup-main-background" />
        <p className="bid-amount-popup-title-text">Price</p>
        <div className="bid-amount-popup-titanium-resource-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="bid-amount-popup-titanium-resource-display-image"
          />
          <p className="bid-amount-popup-titanium-resource-display-text">
            {minBidAmount}
          </p>
        </div>
        {errorMessage != "" && (
          <p className="bid-amount-popup-amount-text">{errorMessage}</p>
        )}
        <div className="bid-amount-popup-amount-container">
          <img
            src={amountBackground}
            className="bid-amount-popup-amount-background"
          />
          <input
            type="number"
            className="bid-amount-popup-amount-input"
            value={amountString}
            onChange={(e) => setAmountString(e.target.value)}
            min="0"
          />
        </div>
        <div className="bid-amount-popup-confirm-button">
          <OrangeButton
            text={"Confirm"}
            onClick={onClickConfirm}
            isDisabled={false}
            fontSizeRatio={0.7}
          />
        </div>
      </div>
    </div>
  );
};

export default BidAmountPopup;
