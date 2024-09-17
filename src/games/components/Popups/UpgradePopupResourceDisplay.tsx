import React from "react";
import { getNumberAbbr } from "../../../data/automata/models";
import "./UpgradePopupResourceDisplay.css";

interface Props {
  iconImagePath?: string | null;
  amount?: number | null;
}

const UpgradePopupResourceDisplay = ({
  iconImagePath = null,
  amount = null,
}: Props) => {
  return (
    <div className="upgrade-popup-resource-display-container">
      {iconImagePath != null && amount != null ? (
        <>
          <img
            src={iconImagePath}
            className="upgrade-popup-resource-display-image"
          />
          <p
            className={
              amount == 0
                ? "upgrade-popup-resource-display-zero-text"
                : amount > 0
                ? "upgrade-popup-resource-display-positive-text"
                : "upgrade-popup-resource-display-negative-text"
            }
          >
            {amount == 0
              ? ""
              : amount > 0
              ? "+" + getNumberAbbr(amount)
              : getNumberAbbr(amount)}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default UpgradePopupResourceDisplay;
