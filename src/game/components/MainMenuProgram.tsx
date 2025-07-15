import React, { useState } from "react";
import "./MainMenuProgram.css";
import {
  ProgramModel,
  getProgramIconPath,
  getProgramSpriteSheetPath,
} from "../../data/models";

import { selectIsSelectingUIState } from "../../data/properties";
import { selectIsLoading } from "../../data/errors";

import { setSelectingProgramIndex } from "../../data/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProgramHover from "./ProgramHover";

interface Props {
  order: number;
  program: ProgramModel | null;
  showContainerAnimation: boolean;
  showProgramAnimation: boolean;
}

const MainMenuProgram = ({
  order,
  program,
  showContainerAnimation,
  showProgramAnimation,
}: Props) => {
  const dispatch = useAppDispatch();
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isLoading = useAppSelector(selectIsLoading);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const radius = 36;
  const yPosition = 50 - Math.sin((angle * Math.PI) / 180) * radius;
  const xPosition = 50 + Math.cos((angle * Math.PI) / 180) * radius;
  const onClick = () => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setSelectingProgramIndex({ selectingIndex: order }));
    }
  };

  return (
    <>
      <div
        className="main-bot-program-bot-container"
        style={{
          top: `${yPosition}%`,
          left: `${xPosition}%`,
        }}
      >
        <div
          key={program?.index}
          className={
            showContainerAnimation
              ? "main-bot-program-animation-container"
              : "main-bot-program-normal-container"
          }
        >
          {program &&
            (showProgramAnimation ? (
              <div
                className="main-bot-program-animation"
                style={{
                  backgroundImage: `url('${getProgramSpriteSheetPath(
                    program.type
                  )}')`,
                }}
              />
            ) : (
              <div
                className="main-bot-program-image"
                style={{
                  backgroundImage: `url('${getProgramIconPath(program.type)}')`,
                }}
              />
            ))}
        </div>
        {isHovering && (
          <div
            className={
              order < 4
                ? "main-bot-program-right-hover-container"
                : "main-bot-program-left-hover-container"
            }
          >
            <ProgramHover program={program} />
          </div>
        )}
      </div>
      <div
        className="main-bot-program-button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(-50%, -50%) rotate(${order * 45 - 45}deg)`,
        }}
      />
    </>
  );
};

export default MainMenuProgram;
