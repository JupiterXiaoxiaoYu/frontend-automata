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
import NewProgramAnimationCollectButton from "../script/button/NewProgramAnimationCollectButton";

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

  const spinImageContainerRef = useRef<HTMLDivElement>(null);
  const mainAnimationContainerRef = useRef<HTMLDivElement>(null);
  const [mainAnimationScale, setMainAnimationScale] = useState<number>(0);
  const [spinAnimationScale, setSpinAnimationScale] = useState<number>(0);

  const adjustSize = () => {
    if (mainAnimationContainerRef.current) {
      setMainAnimationScale(mainAnimationContainerRef.current.offsetHeight);
    }
    if (spinImageContainerRef.current) {
      setSpinAnimationScale(spinImageContainerRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [
    spinImageContainerRef.current,
    spinImageContainerRef.current?.offsetHeight,
  ]);

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
          <div className="new-program-animation-animation-container">
            <div
              ref={mainAnimationContainerRef}
              className="new-program-animation-main-animation-container"
              style={{
                transform: `translate(-50%, -50%) scale(${mainAnimationScale}%, ${mainAnimationScale}%)`,
              }}
            >
              <div className="new-program-animation-main-animation" />
            </div>
          </div>
          <div
            className={
              animationEnd
                ? "new-program-animation-program-container active"
                : "new-program-animation-program-container"
            }
          >
            <div
              ref={spinImageContainerRef}
              className="new-program-animation-spin-image-container"
              style={{
                transform: `translate(-50%, -50%) scale(${spinAnimationScale}%, ${spinAnimationScale}%)`,
              }}
            >
              <img src={bg_spin} className="new-program-animation-spin-image" />
            </div>
            <Program
              index={-1}
              program={program}
              isDisabled={true}
              isMasked={false}
              onSelect={() => {
                /* */
              }}
            />
            <div className="new-program-animation-program-collect-button">
              <NewProgramAnimationCollectButton
                isDisabled={false}
                onClick={onClickCancel}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProgramAnimation;
