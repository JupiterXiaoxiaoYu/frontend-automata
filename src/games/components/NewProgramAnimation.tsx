import React, { useState, useEffect, useRef } from "react";
import {
  selectIsSelectingUIState,
  selectUIState,
  setUIState,
  UIState,
} from "../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import image_00 from "../images/Animations/NewProgram.png";
import bg_spin from "../images/backgrounds/bg_spin.png";
import "./NewProgramAnimation.css";
import { selectAllPrograms } from "../../data/automata/programs";

import Program from "./Program";
import { selectIsSelectingCreatingCreature } from "../../data/automata/creatures";

const NewProgramAnimation = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const programs = useAppSelector(selectAllPrograms);
  const program = programs[programs.length - 1];
  const isSelectingCreatingCreature = useAppSelector(
    selectIsSelectingCreatingCreature
  );

  useEffect(() => {
    if (uIState == UIState.PlayNewProgramAnimation) {
      setShowAnimation(true);
      setTimeout(() => {
        setAnimationEnd(true);
      }, 2000);
    }
  }, [uIState]);

  const onClickCancel = () => {
    if (animationEnd) {
      dispatch(
        setUIState({
          uIState: isSelectingCreatingCreature
            ? UIState.Creating
            : UIState.Idle,
        })
      );
      setShowAnimation(false);
      setAnimationEnd(false);
    }
  };

  return (
    <>
      {showAnimation && (
        <div className="new-program-animation-container">
          <div onClick={onClickCancel} className="new-program-animation-mask" />
          <div className="new-program-animation-program-container">
            <div className="new-program-animation-main-animation" />
            {animationEnd && (
              <>
                <img
                  src={bg_spin}
                  className="new-program-animation-spin-image"
                />
                <Program
                  program={program}
                  isDisabled={true}
                  onSelect={() => {
                    /* */
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewProgramAnimation;
