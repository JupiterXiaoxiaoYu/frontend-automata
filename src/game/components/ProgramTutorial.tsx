import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectTutorialType,
  selectUIState,
  TutorialType,
  UIState,
  UIStateType,
} from "../../data/properties";
import background from "../image/backgrounds/tutorial_frame.png";
import "./ProgramTutorial.css";

const ProgramTutorial = () => {
  const tutorialType = useAppSelector(selectTutorialType);
  const uIState = useAppSelector(selectUIState);
  const showProgramTutorial =
    tutorialType == TutorialType.Program &&
    uIState.type == UIStateType.Creating;

  return (
    <>
      {showProgramTutorial && (
        <div className="program-tutorial-container">
          <img src={background} className="program-tutorial-background" />
          <div className="program-tutorial-animation" />
          <p className="program-tutorial-title"> Select Program </p>
          <p className="program-tutorial-description">
            Select Program to continue
          </p>
        </div>
      )}
    </>
  );
};

export default ProgramTutorial;
