import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectTutorialType,
  selectUIState,
  TutorialType,
  UIState,
} from "../../data/automata/properties";
import background from "../images/backgrounds/tutorial_frame.png";
import "./CreatureTutorial.css";

const CreatureTutorial = () => {
  const tutorialType = useAppSelector(selectTutorialType);
  const uIState = useAppSelector(selectUIState);
  const showCreatureTutorial =
    tutorialType == TutorialType.Creature && uIState == UIState.Idle;

  return (
    <>
      {showCreatureTutorial && (
        <div className="creature-tutorial-container">
          <img src={background} className="creature-tutorial-background" />
          <div className="creature-tutorial-animation" />
          <p className="creature-tutorial-title"> Select Creature </p>
          <p className="creature-tutorial-description">
            Select Creature to continue
          </p>
        </div>
      )}
    </>
  );
};

export default CreatureTutorial;
