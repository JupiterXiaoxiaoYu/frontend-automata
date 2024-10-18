import React, { useRef, useEffect, useState } from "react";
import "./GainTitaniumResource.css";

interface Props {
  animationIndex: number;
  delayTime: number;
}

const GainTitaniumResource = ({ animationIndex, delayTime }: Props) => {
  const [localAnimationIndex, setLocalAnimationIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setTimeout(() => {
      setLocalAnimationIndex(animationIndex);
    }, delayTime);
  }, [animationIndex]);

  return (
    <>
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
