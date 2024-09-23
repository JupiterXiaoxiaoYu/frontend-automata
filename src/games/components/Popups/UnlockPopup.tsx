import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import { UIState, setUIState } from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./UnlockPopup.css";
import {
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";

const UnlockPopup = () => {
  const dispatch = useAppDispatch();

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.PlayUnlockAnimation }));
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Creating }));
  };

  return (
    <div className="unlock-popup-container">
      <div onClick={onClickCancel} className="unlock-popup-mask" />
      <div className="unlock-popup-main-container">
        <img src={background} className="unlock-popup-main-background" />
        <p className="unlock-popup-title-text">Unlock</p>
        <p className="unlock-popup-subtitle-text">Cost</p>
        <div className="unlock-popup-cost-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="unlock-popup-cost-icon"
          />
          <p className="unlock-popup-cost-text">{100}</p>
          <img
            src={amountBackground}
            className="unlock-popup-cost-background"
          />
        </div>
        <div className="unlock-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default UnlockPopup;
