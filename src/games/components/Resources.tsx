import React from "react";
import ResourceDisplay from "./ResourceDisplay";
import { useAppSelector } from "../../app/hooks";
import "./Resources.css";

import { selectResources } from "../../data/automata/resources";
import { getResourceIconPath, resourceTypes } from "../../data/automata/models";

const Resources = () => {
  return (
    <div className="top-resources-container">
      {resourceTypes.map((type, index) => (
        <ResourceDisplay
          key={index}
          iconImagePath={getResourceIconPath(type)}
          amount={useAppSelector(selectResources(type))}
        />
      ))}
    </div>
  );
};

export default Resources;
