import React from "react";
import "./DiffResourcesInfo.css";
import infoBackground from "../images/backgrounds/info_frame.png";
import Grid from "./Grid";
import DiffResourceDisplay from "./DiffResourceDisplay";

import { getResourceIconPath, resourceTypes } from "../../data/automata/models";

interface Props {
  diffResources: {
    [k: string]: number;
  };
}

const DiffResourcesInfo = ({ diffResources }: Props) => {
  return (
    <>
      <img src={infoBackground} className="main-info-background" />
      <div className="diff-resources-info-grid">
        <Grid
          columnCount={4}
          rowCount={5}
          elements={resourceTypes.map((type, index) => (
            <DiffResourceDisplay
              key={index}
              iconImagePath={getResourceIconPath(type)}
              amount={diffResources[type]}
            />
          ))}
        />
      </div>
    </>
  );
};

export default DiffResourcesInfo;
