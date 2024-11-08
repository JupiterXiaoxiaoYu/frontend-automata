import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectTutorialType,
  TutorialType,
} from "../../data/automata/properties";
import background from "../images/backgrounds/tutorial_frame.png";
import "./Tutorials.css";

const Tutorials = () => {
  const tutorialType = useAppSelector(selectTutorialType);
  const showCreatureTutorial = tutorialType == TutorialType.Creature;
  const showProgramTutorial = tutorialType == TutorialType.Program;

  return (
    <div className="tutorial-container">
      {showCreatureTutorial && (
        <div className="tutorial-creature-container">
          <img src={background} className="tutorial-creature-background" />
          <div className="tutorial-creature-animation" />
          <p className="tutorial-creature-title"> Select Creature </p>
          <p className="tutorial-creature-description">
            {" "}
            Select Creature to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default Tutorials;
