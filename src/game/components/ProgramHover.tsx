import React, { useEffect, useRef, useState } from "react";
import "./ProgramHover.css";
import background from "../image/backgrounds/hover_frame.png";
import Grid from "./Grid";
import {
  getResourceIconPath,
  ProgramModel,
  AttributeType,
} from "../../data/models";
import ProgramResourceDisplay from "./ProgramResourceDisplay";
import { useAppSelector } from "../../app/hooks";
import {
  selectSelectedCreature,
  adjustResourceByProductivity,
  adjustProcessingTimeBySpeed,
  formatTime,
} from "../../data/creatures";

interface Props {
  program: ProgramModel | null;
}

const ProgramHover = ({ program }: Props) => {
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const productivityValue =
    selectedCreature.attributes.find(
      (attr: { type: AttributeType; amount: number }) =>
        attr.type === AttributeType.Productivity
    )?.amount ?? 0;
  const efficiencyValue =
    selectedCreature.attributes.find(
      (attr: { type: AttributeType; amount: number }) =>
        attr.type === AttributeType.Efficiency
    )?.amount ?? 0;
  const speedValue =
    selectedCreature.attributes.find(
      (attr: { type: AttributeType; amount: number }) =>
        attr.type === AttributeType.Speed
    )?.amount ?? 0;
  const gridContainerRef = useRef<HTMLParagraphElement>(null);
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementHeight, setElementHeight] = useState<number>(0);
  const columnCount = 2;
  const rowCount = 4;

  const adjustSize = () => {
    if (gridContainerRef.current) {
      setElementWidth(gridContainerRef.current.offsetWidth / columnCount);
      setElementHeight(gridContainerRef.current.offsetHeight / rowCount);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [gridContainerRef.current, gridContainerRef.current?.offsetHeight]);

  return (
    <>
      {program && (
        <div className="program-hover-container">
          <img src={background} className="program-hover-background" />
          <div className="program-hover-resource-grid" ref={gridContainerRef}>
            <Grid
              elementWidth={elementWidth}
              elementHeight={elementHeight}
              columnCount={columnCount}
              rowCount={rowCount}
              elements={program.resources.map((resource, index) => {
                const adjustedResource = adjustResourceByProductivity(
                  resource,
                  productivityValue,
                  efficiencyValue
                );
                return (
                  <ProgramResourceDisplay
                    key={index}
                    iconImagePath={getResourceIconPath(resource.type)}
                    amount={adjustedResource.amount}
                    originalAmount={resource.amount}
                  />
                );
              })}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramHover;
