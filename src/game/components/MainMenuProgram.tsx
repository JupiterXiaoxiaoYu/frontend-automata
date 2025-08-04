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

  const yPosition = 40.8;
  const xPosition = 5.5 + 10.85 * order;
  const onClick = () => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setSelectingProgramIndex({ selectingIndex: order }));
    }
  };

  return (
    <>
      <div
        className="main-bot-program-bot-container"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          <div className="main-bot-program-hover-container">
            <ProgramHover program={program} />
          </div>
        )}
      </div>
    </>
  );
};

export default MainMenuProgram;
