import React, { useEffect, useRef } from "react";
import "./GainEnergy.css";

interface Props {
  animationIndex: number;
  rewardAnimation: boolean;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  rewardAnimationDelay: number;
  shakeAnimationDelay: number;
  energyImagePath: string;
  opacity: number;
  onAnimationEnd: () => void;
}

const GainEnergy = ({
  animationIndex,
  rewardAnimation,
  startPosition,
  endPosition,
  rewardAnimationDelay,
  shakeAnimationDelay,
  opacity,
  energyImagePath,
  onAnimationEnd,
}: Props) => {
  const getParabolaXStartPositionString = () => {
    return `translate(0px, 0px)`;
  };

  const getParabolaXEndPositionString = () => {
    return `translate(${endPosition.x - startPosition.x}px, 0px)`;
  };

  const getParabolaYStartPositionString = () => {
    return `translate(0px, 0px)`;
  };

  const getParabolaYEndPositionString = () => {
    return `translate(0px, ${endPosition.y - startPosition.y}px)`;
  };

  const popUpRef = useRef<HTMLDivElement | null>(null);
  const parabolaXRef = useRef<HTMLDivElement | null>(null);
  const parabolaYRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const parabolaXAnimationName = `GainEnergyParabolaX-${animationIndex}`;
  const parabolaYAnimationName = `GainEnergyParabolaY-${animationIndex}`;
  const enlargeAnimationName = `GainEnergyEnlarge-${animationIndex}`;

  const onIconAnimationEnd = (setEndPosition: () => void) => {
    removeAnimation();
    setEndPosition();
  };

  const removeAnimation = () => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
      if (
        rule.name == parabolaYAnimationName ||
        rule.name == parabolaYAnimationName ||
        rule.name == enlargeAnimationName
      ) {
        styleSheet.deleteRule(i);
      }
    }
  };

  const InitRewardAnimation = () => {
    const parabolaXContainer = parabolaXRef.current;
    const parabolaYContainer = parabolaYRef.current;
    const imageRefContainer = imageRef.current;
    if (parabolaXContainer && parabolaYContainer && imageRefContainer) {
      const parabolaXStartPositionString = getParabolaXStartPositionString();
      const parabolaXEndPositionString = getParabolaXEndPositionString();
      const parabolaYStartPositionString = getParabolaYStartPositionString();
      const parabolaYEndPositionString = getParabolaYEndPositionString();
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const parabolaXKeyframes = `
          @keyframes ${parabolaXAnimationName} {
            0% { transform: ${parabolaXStartPositionString}; }
            10% { transform: ${parabolaXStartPositionString}; }
            100% { transform: ${parabolaXEndPositionString}; }
          }
        `;
      parabolaXContainer.style.animation = `${parabolaXAnimationName} 0.5s linear`;
      parabolaXContainer.style.animationDelay = `${rewardAnimationDelay}s`;
      const parabolaYKeyframes = `
          @keyframes ${parabolaYAnimationName} {
            0% { transform: ${parabolaYStartPositionString}; }
            10% { transform: ${parabolaYStartPositionString}; }
            100% { transform: ${parabolaYEndPositionString}; }
          }
        `;
      parabolaYContainer.style.animation = `${parabolaYAnimationName} 0.5s cubic-bezier(.5,0,.8,.5)`;
      parabolaYContainer.style.animationDelay = `${rewardAnimationDelay}s`;
      const enlargeKeyframes = `
          @keyframes ${enlargeAnimationName} {
            0% { opacity: ${opacity}; transform: translate(-50%, -50%) scale(100%, 100%); }
            50% { opacity: ${opacity}; transform: translate(-50%, -50%) scale(100%, 100%); }
            100% { opacity: ${opacity}; transform: translate(-50%, -50%) scale(150%, 150%); }
          }
        `;
      imageRefContainer.style.animation = `${enlargeAnimationName} 0.5s linear`;
      imageRefContainer.style.animationDelay = `${rewardAnimationDelay}s`;

      styleSheet.insertRule(parabolaXKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaYKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(enlargeKeyframes, styleSheet.cssRules.length);

      const setEndPosition = () => {
        parabolaXContainer.style.transform = parabolaXEndPositionString;
        parabolaYContainer.style.transform = parabolaYEndPositionString;
      };

      parabolaXContainer.removeEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
      parabolaXContainer.addEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
    }
  };

  useEffect(() => {
    if (rewardAnimation) {
      InitRewardAnimation();
    }
  }, [rewardAnimation]);

  return (
    <div
      className="gain-energy-container"
      style={{
        left: `calc(50% + ${startPosition.x}px)`,
        top: `calc(50% + ${startPosition.y}px)`,
      }}
    >
      <div
        ref={parabolaXRef}
        className={"gain-energy-animation-container"}
        onAnimationEnd={onAnimationEnd}
      >
        <div ref={parabolaYRef} className={"gain-energy-animation-container"}>
          <div ref={popUpRef} className="gain-energy-pop-up-animation">
            <div
              className={"gain-energy-shake-animation"}
              style={{ animationDelay: `${shakeAnimationDelay}s` }}
            >
              <div
                ref={imageRef}
                className="gain-energy-image"
                style={{
                  backgroundImage: `url(${energyImagePath})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GainEnergy;
