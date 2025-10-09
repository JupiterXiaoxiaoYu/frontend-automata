import React, { useEffect, useRef, useState } from "react";
import "./Program.css";
import Grid from "./Grid";
import ProgramResourceDisplay from "./ProgramResourceDisplay";
import {
  ProgramModel,
  getResourceIconPath,
  getProgramIconPath,
  AttributeType,
} from "../../data/models";
import ProgramButton from "./Buttons/ProgramButton";

import {
  formatTime,
  adjustResourceByProductivity,
  adjustProcessingTimeBySpeed,
} from "../../data/creatures";
import ProgramTutorial from "./ProgramTutorial";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedCreature } from "../../data/creatures";
import disabledImageMask from "../image/backgrounds/listed_program_frame.png";

interface Props {
  index: number;
  program: ProgramModel;
  isDisabled: boolean;
  isMasked: boolean;
  onSelect: () => void;
}

const Program = ({ index, program, isMasked, isDisabled, onSelect }: Props) => {
  // 获取选中生物的Productivity、Efficiency和Speed属性值
  // Get the Productivity, Efficiency and Speed attribute values of the selected creature
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
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [nameFontSize, setNameFontSize] = useState<number>(0);
  const [timeFontSize, setTimeFontSize] = useState<number>(0);
  const gridContainerRef = useRef<HTMLParagraphElement>(null);
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementHeight, setElementHeight] = useState<number>(0);
  const columnCount = 2;
  const rowCount = 4;

  const adjustSize = () => {
    if (containerRef.current) {
      setNameFontSize(containerRef.current.offsetHeight / 9);
      setTimeFontSize(containerRef.current.offsetHeight / 11);
    }
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
  }, [containerRef.current, containerRef.current?.offsetHeight]);

  return (
    <div className="program-container" ref={containerRef}>
      {index == 0 && <ProgramTutorial />}
      <ProgramButton isDisabled={isDisabled} onClick={onSelect} />
      <p className="program-name-text" style={{ fontSize: nameFontSize }}>
        {program.name}
      </p>
      <p className="program-time-text" style={{ fontSize: timeFontSize }}>
        {formatTime(
          adjustProcessingTimeBySpeed(program.processingTime, speedValue)
        )}
      </p>
      <img
        src={getProgramIconPath(program.type)}
        className="program-icon-image"
      />
      <div className="program-resource-grid" ref={gridContainerRef}>
        <Grid
          elementWidth={elementWidth}
          elementHeight={elementHeight}
          columnCount={columnCount}
          rowCount={rowCount}
          elements={program.resources.map((resource, index) => {
            // 调整资源数量，同时考虑Productivity和Efficiency属性
            // Adjust resource amount considering both Productivity and Efficiency attributes
            const adjustedResource = adjustResourceByProductivity(
              resource,
              productivityValue,
              efficiencyValue
            );
            return (
              <ProgramResourceDisplay
                key={index}
                iconImagePath={getResourceIconPath(resource.type)}
                amount={resource.amount}
                // originalAmount={resource.amount}
              />
            );
          })}
        />
      </div>
      {isMasked && (
        <img
          src={disabledImageMask}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
};

export default Program;
