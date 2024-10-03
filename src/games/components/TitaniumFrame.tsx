import React from "react";
import { useAppSelector } from "../../app/hooks";
import "./TitaniumFrame.css";
import background from "../images/backgrounds/titan_frame.png";
import { selectResource } from "../../data/automata/resources";
import {
  getResourceIconPath,
  ResourceType,
  getNumberAbbr,
} from "../../data/automata/models";
import DepositButton from "./Buttons/DepositButton";
import WithdrawButton from "./Buttons/WithdrawButton";

interface Props {
  onClickWithdraw: () => void;
  onClickDeposit: () => void;
}

const TitaniumFrame = ({ onClickWithdraw, onClickDeposit }: Props) => {
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));

  return (
    <div className="titanium-frame-container">
      <img className="titanium-frame-background" src={background} />
      <div className="titanium-frame-resource-container">
        <img
          src={getResourceIconPath(ResourceType.Titanium)}
          className="titanium-frame-resource-display-image"
        />
        <p className="titanium-frame-resource-display-text">
          {getNumberAbbr(titaniumCount)}
        </p>
      </div>
      <div className="titanium-frame-withdraw">
        <WithdrawButton onClick={onClickWithdraw} />
      </div>
      <div className="titanium-frame-deposit">
        <DepositButton onClick={onClickDeposit} />
      </div>
    </div>
  );
};

export default TitaniumFrame;
