import React, { useState, useEffect, useRef } from "react";
import {
  selectIsSelectingUIState,
  selectUIState,
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
import image_31 from "../images/Animations/NewPrograms/card_31.png";
import image_32 from "../images/Animations/NewPrograms/card_32.png";
import image_33 from "../images/Animations/NewPrograms/card_33.png";
import image_34 from "../images/Animations/NewPrograms/card_34.png";
import image_35 from "../images/Animations/NewPrograms/card_35.png";
import image_36 from "../images/Animations/NewPrograms/card_36.png";
import image_37 from "../images/Animations/NewPrograms/card_37.png";
import image_38 from "../images/Animations/NewPrograms/card_38.png";
import image_39 from "../images/Animations/NewPrograms/card_39.png";
import image_40 from "../images/Animations/NewPrograms/card_40.png";
import image_41 from "../images/Animations/NewPrograms/card_41.png";
import image_42 from "../images/Animations/NewPrograms/card_42.png";
import image_43 from "../images/Animations/NewPrograms/card_43.png";
import image_44 from "../images/Animations/NewPrograms/card_44.png";
import image_45 from "../images/Animations/NewPrograms/card_45.png";
import image_46 from "../images/Animations/NewPrograms/card_46.png";
import image_47 from "../images/Animations/NewPrograms/card_47.png";
import image_48 from "../images/Animations/NewPrograms/card_48.png";
import image_49 from "../images/Animations/NewPrograms/card_49.png";
import image_50 from "../images/Animations/NewPrograms/card_50.png";
import image_51 from "../images/Animations/NewPrograms/card_51.png";
import image_52 from "../images/Animations/NewPrograms/card_52.png";
import image_53 from "../images/Animations/NewPrograms/card_53.png";
import image_54 from "../images/Animations/NewPrograms/card_54.png";
import image_55 from "../images/Animations/NewPrograms/card_55.png";
import image_56 from "../images/Animations/NewPrograms/card_56.png";
import image_57 from "../images/Animations/NewPrograms/card_57.png";
import image_58 from "../images/Animations/NewPrograms/card_58.png";
import image_59 from "../images/Animations/NewPrograms/card_59.png";
import image_60 from "../images/Animations/NewPrograms/card_60.png";
import image_61 from "../images/Animations/NewPrograms/card_61.png";
import image_62 from "../images/Animations/NewPrograms/card_62.png";
import image_63 from "../images/Animations/NewPrograms/card_63.png";
import image_64 from "../images/Animations/NewPrograms/card_64.png";
import image_65 from "../images/Animations/NewPrograms/card_65.png";
import image_66 from "../images/Animations/NewPrograms/card_66.png";
import image_67 from "../images/Animations/NewPrograms/card_67.png";
import image_68 from "../images/Animations/NewPrograms/card_68.png";
import image_69 from "../images/Animations/NewPrograms/card_69.png";
import image_70 from "../images/Animations/NewPrograms/card_70.png";
import image_71 from "../images/Animations/NewPrograms/card_71.png";
import "./NewProgramAnimation.css";

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
    image_31,
    image_32,
    image_33,
    image_34,
    image_35,
    image_36,
    image_37,
    image_38,
    image_39,
    image_40,
    image_41,
    image_42,
    image_43,
    image_44,
    image_45,
    image_46,
    image_47,
    image_48,
    image_49,
    image_50,
    image_51,
    image_52,
    image_53,
    image_54,
    image_55,
    image_56,
    image_57,
    image_58,
    image_59,
    image_60,
    image_61,
    image_62,
    image_63,
    image_64,
    image_65,
    image_66,
    image_67,
    image_68,
    image_69,
    image_70,
    image_71,
  ];

  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const [showAnimation, setShowAnimation] = useState(false);

  const animationName = "NewProgramAnimation";
  const generateAnimation = () => {
    if (document.getElementById(animationName)) {
      return;
    }

    const keyframes = [...images, images[0]]
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
    }
  }, [uIState]);

  return (
    <div>
      {images.map((image, index) => (
        <link key={index} rel="preload" href={image} as="image" />
      ))}
      {showAnimation && (
        <div className="new-program-animation-container">
          <div className="new-program-animation-mask"></div>
          <div className="new-program-animation-main-animation"></div>
        </div>
      )}
    </div>
  );
};

export default NewProgramAnimation;
