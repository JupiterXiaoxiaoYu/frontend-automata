import React from "react";
import "./NewProgram.css";
import background from "../images/backgrounds/new_program_normal.png";
import EmptyButton from "./Buttons/EmptyButton";
import { getResourceIconPath, ResourceType } from "../../data/automata/models";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentCost } from "../../data/automata/properties";
import { selectResource } from "../../data/automata/resources";

interface Props {
  onSelect: () => void;
}

const NewProgram = ({ onSelect }: Props) => {
  const currentCost = useAppSelector(selectCurrentCost);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));

  return (
    <div className="new-program-container">
      <img src={background} className="new-program-background" />
      <p className="new-program-title-text">Buy New</p>
      <p className="new-program-title-2-text">Program</p>
      <p className="new-program-button">
        <EmptyButton
          isDisabled={titaniumCount < currentCost}
          onClick={onSelect}
        />
      </p>
      <img
        src={getResourceIconPath(ResourceType.Titanium)}
        className="new-program-icon-image"
      />
      <p className="new-program-button-text">{currentCost}</p>
    </div>
  );
};

export default NewProgram;
