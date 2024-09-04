import React, { useRef, useEffect, useState } from "react";
import "./GainTitaniumResource.css";
import image_00 from "../images/Animations/TitaniumScore/titanium_score_00.png";
import image_01 from "../images/Animations/TitaniumScore/titanium_score_01.png";
import image_02 from "../images/Animations/TitaniumScore/titanium_score_02.png";
import image_03 from "../images/Animations/TitaniumScore/titanium_score_03.png";
import image_04 from "../images/Animations/TitaniumScore/titanium_score_04.png";
import image_05 from "../images/Animations/TitaniumScore/titanium_score_05.png";
import image_06 from "../images/Animations/TitaniumScore/titanium_score_06.png";
import image_07 from "../images/Animations/TitaniumScore/titanium_score_07.png";
import image_08 from "../images/Animations/TitaniumScore/titanium_score_08.png";
import image_09 from "../images/Animations/TitaniumScore/titanium_score_09.png";
import image_10 from "../images/Animations/TitaniumScore/titanium_score_10.png";
import image_11 from "../images/Animations/TitaniumScore/titanium_score_11.png";

interface Props {
  animationIndex: number;
  delayTime: number;
}

const GainTitaniumResource = ({ animationIndex, delayTime }: Props) => {
  const [localAnimationIndex, setLocalAnimationIndex] = useState<number | null>(
    null
  );
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
  ];

  useEffect(() => {
    setTimeout(() => {
      setLocalAnimationIndex(animationIndex);
    }, delayTime);
  }, [animationIndex]);

  return (
    <>
      {images.map((image, index) => (
        <link key={index} rel="preload" href={image} as="image" />
      ))}
      {localAnimationIndex != null && (
        <div
          key={localAnimationIndex}
          className="gain-titanium-resource-container"
        >
          <div className="gain-titanium-resource-animation" />
        </div>
      )}
    </>
  );
};

export default GainTitaniumResource;
