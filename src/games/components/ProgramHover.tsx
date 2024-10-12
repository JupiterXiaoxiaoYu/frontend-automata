import React from "react";
import "./ProgramHover.css";
import background from "../images/backgrounds/hover_frame.png";
import Grid from "./Grid";
import { getResourceIconPath, ProgramModel } from "../../data/automata/models";
import ProgramResourceDisplay from "./ProgramResourceDisplay";

interface Props {
  program: ProgramModel | null;
}

const ProgramHover = ({ program }: Props) => {
  return (
    <>
      {program && (
        <div className="program-hover-container">
          <img src={background} className="program-hover-background" />
          <div className="program-hover-resource-grid">
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
      )}
    </>
  );
};

export default ProgramHover;
