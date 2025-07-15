import React from "react";
import "./NewProgram.css";
import background from "../image/backgrounds/new_program_normal.png";
import { getResourceIconPath, ResourceType } from "../../data/models";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentCost, selectLevel } from "../../data/properties";
import { selectResource } from "../../data/resources";
import { selectProgramCount } from "../../data/programs";
import OrangeButton from "../script/button/OrangeButton";

interface Props {
  onSelect: () => void;
}

const NewProgram = ({ onSelect }: Props) => {
  const currentCost = useAppSelector(selectCurrentCost);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));
  const programCount = useAppSelector(selectProgramCount);
  const level = useAppSelector(selectLevel);

  return (
    <div className="new-program-container">
      <img src={background} className="new-program-background" />
      <p className="new-program-title-text">Buy New</p>
      <p className="new-program-title-2-text">Program</p>
      <div className="new-program-button">
        <OrangeButton
          text={""}
          onClick={onSelect}
          isDisabled={
            titaniumCount < currentCost || programCount >= level * 4 + 4
          }
        />
      </div>
      <img
        src={getResourceIconPath(ResourceType.Titanium)}
        className="new-program-icon-image"
      />
      <p className="new-program-button-text">{currentCost}</p>
    </div>
  );
};

export default NewProgram;
