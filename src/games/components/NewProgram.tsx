import React from "react";
import "./NewProgram.css";
import Grid from "./Grid";
import {
  ProgramModel,
  getResourceIconPath,
  getProgramIconPath,
} from "../../data/automata/models";
import ProgramButton from "./Buttons/ProgramButton";

import { formatTime } from "../../data/automata/creatures";

interface Props {
  onSelect: () => void;
}

const NewProgram = ({ onSelect }: Props) => {
  return (
    <div className="new-program-container">
      <ProgramButton isDisabled={false} onClick={onSelect} />
      <p className="new-program-name-text">New Program</p>
    </div>
  );
};

export default NewProgram;
