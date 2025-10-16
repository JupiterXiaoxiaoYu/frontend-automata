import React, { useEffect, useRef, useState } from "react";
import "./RedeemDisplay.css";
import background from "../image/backgrounds/redeem_frame.png";
import RedeemButton from "./Buttons/RedeemDisplayButton";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

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
    <div className="redeem-display-container" ref={containerRef}>
      <img className="redeem-display-background" src={background} />
      <img className="redeem-display-reward-icon" src={rewardIconImagePath} />
      <p
        className="redeem-display-reward-cross-text"
        style={{ fontSize: fontSize * 15 }}
      >
        x
      </p>
      <p
        className="redeem-display-reward-amount-text"
        style={{ fontSize: fontSize * 18 }}
      >
        {rewardAmount}
      </p>
      <div className="redeem-display-button">
        <RedeemButton isDisabled={isDisabled} onClick={onClickRedeem} />
      </div>
      <img className="redeem-display-cost-icon" src={costIconImagePath} />
      <p
        className="redeem-display-cost-cross-text"
        style={{ fontSize: fontSize * 10 }}
      >
        x
      </p>
      <p
        className="redeem-display-cost-amount-text"
        style={{ fontSize: fontSize * 13 }}
      >
        {costAmount}
      </p>
    </div>
  );
};

export default RedeemDisplay;
