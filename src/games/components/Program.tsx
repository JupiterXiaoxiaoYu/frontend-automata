import React from "react";
import "./Program.css";
import Grid from "./Grid";
import ProgramResourceDisplay from "./ProgramResourceDisplay";
import {
  ProgramModel,
  getResourceIconPath,
  getProgramIconPath,
} from "../../data/automata/models";
import ProgramButton from "./Buttons/ProgramButton";

import { formatTime } from "../../data/automata/creatures";

interface Props {
  program: ProgramModel;
  onSelect: () => void;
}

const Program = ({ program, onSelect }: Props) => {
  return (
    <div className="program-container">
      <ProgramButton isDisabled={false} onClick={onSelect} />
      <p className="program-name-text">{program.name}</p>
      <p className="program-time-text">{formatTime(program.processingTime)}</p>
      <img
        src={getProgramIconPath(program.type)}
        className="program-icon-image"
      />
      <div className="program-resource-grid">
        <Grid
          elementWidth={44}
          elementHeight={16}
          columnCount={2}
          rowCount={4}
          elements={program.resources.map((resource, index) => (
            <ProgramResourceDisplay
              key={index}
              iconImagePath={getResourceIconPath(resource.type)}
              amount={resource.amount}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Program;
