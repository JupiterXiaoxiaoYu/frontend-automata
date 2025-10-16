import React, { useEffect, useRef, useState } from "react";
import "./RedeemDisplayCollectInterest.css";
import background from "../image/backgrounds/redeem_frame.png";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(15);

  const adjustSize = () => {
    if (containerRef.current) {
      const digit = Math.max(2, rewardAmount.toString().length);
      setFontSize(containerRef.current.offsetHeight / 70 / (digit / 2));
    }
  };

  useEffect(() => {
    adjustSize();
  }, [rewardAmount]);

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [containerRef.current, containerRef.current?.offsetHeight]);
  return (
    <div
      className="redeem-display-collect-interest-container"
      ref={containerRef}
    >
      <img
        className="redeem-display-collect-interest-background"
        src={background}
      />
      <img
        className="redeem-display-collect-interest-reward-icon"
        src={rewardIconImagePath}
      />
      <p
        className="redeem-display-collect-interest-reward-cross-text"
        style={{ fontSize: fontSize * 15 }}
      >
        x
      </p>
      <p
        className="redeem-display-collect-interest-reward-amount-text"
        style={{ fontSize: fontSize * 18 }}
      >
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
