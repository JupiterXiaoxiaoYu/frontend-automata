import React from "react";
import "./RedeemDisplayCollectInterest.css";
import background from "../images/backgrounds/redeem_frame.png";
import CollectInterestButton from "./Buttons/CollectInterestButton";

interface Props {
  isDisabled: boolean;
  rewardIconImagePath: string;
  rewardAmount: number;
  onClickCollectInterest: () => void;
}

const RedeemDisplayCollectInterest = ({
  isDisabled,
  rewardIconImagePath,
  rewardAmount,
  onClickCollectInterest,
}: Props) => {
  return (
    <div className="redeem-display-collect-interest-container">
      <img
        className="redeem-display-collect-interest-background"
        src={background}
      />
      <img
        className="redeem-display-collect-interest-reward-icon"
        src={rewardIconImagePath}
      />
      <p className="redeem-display-collect-interest-reward-cross-text">x</p>
      <p className="redeem-display-collect-interest-reward-amount-text">
        {rewardAmount}
      </p>
      <div className="redeem-display-collect-interest-button">
        <CollectInterestButton
          isDisabled={isDisabled}
          onClick={onClickCollectInterest}
        />
      </div>
    </div>
  );
};

export default RedeemDisplayCollectInterest;
