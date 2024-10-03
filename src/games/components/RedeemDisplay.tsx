import React from "react";
import "./RedeemDisplay.css";
import background from "../images/backgrounds/redeem_frame.png";
import { getResourceIconPath, ResourceType } from "../../data/automata/models";
import RedeemButton from "./Buttons/RedeemButton";

interface Props {
  isDisabled: boolean;
  costIconImagePath: string;
  costAmount: number;
  rewardIconImagePath: string;
  rewardAmount: number;
  onClickRedeem: () => void;
}

const RedeemDisplay = ({
  isDisabled,
  costIconImagePath,
  costAmount,
  rewardIconImagePath,
  rewardAmount,
  onClickRedeem,
}: Props) => {
  return (
    <div className="redeem-display-container">
      <img className="redeem-display-background" src={background} />
      <img className="redeem-display-reward-icon" src={rewardIconImagePath} />
      <p className="redeem-display-reward-cross-text">x</p>
      <p className="redeem-display-reward-amount-text">{rewardAmount}</p>
      <div className="redeem-display-button">
        <RedeemButton isDisabled={isDisabled} onClick={onClickRedeem} />
      </div>
      <img className="redeem-display-cost-icon" src={costIconImagePath} />
      <p className="redeem-display-cost-cross-text">x</p>
      <p className="redeem-display-cost-amount-text">{costAmount}</p>
    </div>
  );
};

export default RedeemDisplay;
