import React, { useState, useEffect, useRef } from "react";
import {
  selectIsSelectingUIState,
  selectUIState,
  setUIState,
  UIState,
  UIStateType,
} from "../../data/properties";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import image_00 from "../image/Animations/NewProgram.png";
import bg_spin from "../image/backgrounds/bg_spin.png";
import "./NewProgramAnimation.css";
import { selectAllPrograms } from "../../data/programs";

import Program from "./Program";
import { selectIsSelectingCreatingCreature } from "../../data/creatures";

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
    if (uIState.type == UIStateType.PlayNewProgramAnimation) {
      setShowAnimation(true);
      setTimeout(() => {
        setAnimationEnd(true);
      }, 2000);
    }
  }, [uIState]);

  const onClickCancel = () => {
    if (animationEnd) {
      if (isSelectingCreatingCreature) {
        dispatch(setUIState({ uIState: { type: UIStateType.Creating } }));
      } else {
        dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
      }
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
                  index={-1}
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
