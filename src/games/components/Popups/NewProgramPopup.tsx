import React, { useState } from "react";
import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import { UIState, setUIState } from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./NewProgramPopup.css";
import {
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";

const NewProgramPopup = () => {
  const dispatch = useAppDispatch();

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.PlayNewProgramAnimation }));
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  return (
    <div className="new-program-popup-container">
      <div onClick={onClickCancel} className="new-program-popup-mask" />
      <div className="new-program-popup-main-container">
        <img src={background} className="new-program-popup-main-background" />
        <p className="new-program-popup-title-text">New Program</p>
        <p className="new-program-popup-subtitle-text">Cost</p>
        <div className="new-program-popup-cost-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="new-program-popup-cost-icon"
          />
          <p className="new-program-popup-cost-text">{100}</p>
          <img
            src={amountBackground}
            className="new-program-popup-cost-background"
          />
        </div>
        <div className="new-program-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default NewProgramPopup;
