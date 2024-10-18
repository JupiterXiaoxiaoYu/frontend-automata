import React, { useState, useEffect, useRef } from "react";
import {
  selectIsSelectingUIState,
  selectUIState,
  setUIState,
  UIState,
} from "../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import image_00 from "../images/Animations/NewPrograms/card_00.png";
import image_01 from "../images/Animations/NewPrograms/card_01.png";
import image_02 from "../images/Animations/NewPrograms/card_02.png";
import image_03 from "../images/Animations/NewPrograms/card_03.png";
import image_04 from "../images/Animations/NewPrograms/card_04.png";
import image_05 from "../images/Animations/NewPrograms/card_05.png";
import image_06 from "../images/Animations/NewPrograms/card_06.png";
import image_07 from "../images/Animations/NewPrograms/card_07.png";
import image_08 from "../images/Animations/NewPrograms/card_08.png";
import image_09 from "../images/Animations/NewPrograms/card_09.png";
import image_10 from "../images/Animations/NewPrograms/card_10.png";
import image_11 from "../images/Animations/NewPrograms/card_11.png";
import image_12 from "../images/Animations/NewPrograms/card_12.png";
import image_13 from "../images/Animations/NewPrograms/card_13.png";
import image_14 from "../images/Animations/NewPrograms/card_14.png";
import image_15 from "../images/Animations/NewPrograms/card_15.png";
import image_16 from "../images/Animations/NewPrograms/card_16.png";
import image_17 from "../images/Animations/NewPrograms/card_17.png";
import image_18 from "../images/Animations/NewPrograms/card_18.png";
import image_19 from "../images/Animations/NewPrograms/card_19.png";
import image_20 from "../images/Animations/NewPrograms/card_20.png";
import image_21 from "../images/Animations/NewPrograms/card_21.png";
import image_22 from "../images/Animations/NewPrograms/card_22.png";
import image_23 from "../images/Animations/NewPrograms/card_23.png";
import image_24 from "../images/Animations/NewPrograms/card_24.png";
import image_25 from "../images/Animations/NewPrograms/card_25.png";
import image_26 from "../images/Animations/NewPrograms/card_26.png";
import image_27 from "../images/Animations/NewPrograms/card_27.png";
import image_28 from "../images/Animations/NewPrograms/card_28.png";
import image_29 from "../images/Animations/NewPrograms/card_29.png";
import image_30 from "../images/Animations/NewPrograms/card_30.png";
import bg_spin from "../images/backgrounds/bg_spin.png";
import "./NewProgramAnimation.css";
import { selectAllPrograms } from "../../data/automata/programs";

import Program from "./Program";
import { selectIsSelectingCreatingCreature } from "../../data/automata/creatures";

const NewProgramAnimation = () => {
  const images = [
    image_00,
    image_01,
    image_02,
    image_03,
    image_04,
    image_05,
    image_06,
    image_07,
    image_08,
    image_09,
    image_10,
    image_11,
    image_12,
    image_13,
    image_14,
    image_15,
    image_16,
    image_17,
    image_18,
    image_19,
    image_20,
    image_21,
    image_22,
    image_23,
    image_24,
    image_25,
    image_26,
    image_27,
    image_28,
    image_29,
    image_30,
  ];

  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const programs = useAppSelector(selectAllPrograms);
  const program = programs[programs.length - 1];
  const isSelectingCreatingCreature = useAppSelector(
    selectIsSelectingCreatingCreature
  );

  const animationName = "NewProgramAnimation";
  const generateAnimation = () => {
    if (document.getElementById(animationName)) {
      return;
    }

    const keyframes = images
      .map((img, index) => {
        const percentage = (index / images.length) * 100;
        return `${percentage}% { background-image: url(${img}); }`;
      })
      .join(" ");

    const style = document.createElement("style");
    style.id = animationName;
    style.innerHTML = `
    @keyframes ${animationName} {
        ${keyframes}
    }`;
    document.head.appendChild(style);
  };

  useEffect(() => {
    generateAnimation();
  }, []);

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
      <div>
        {images.map((image, index) => (
          <link key={index} rel="preload" href={image} as="image" />
        ))}
      </div>
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
