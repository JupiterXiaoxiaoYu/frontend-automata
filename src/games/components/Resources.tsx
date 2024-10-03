import React from "react";
import ResourceDisplay from "./ResourceDisplay";
import { useAppSelector } from "../../app/hooks";
import "./Resources.css";

import { selectResource } from "../../data/automata/resources";
import {
  getResourceIconPath,
  ResourceType,
  resourceTypes,
} from "../../data/automata/models";

const Resources = () => {
  return (
    <div className="top-resources-container">
      {resourceTypes
        .filter((type) => type != ResourceType.Titanium)
        .map((type, index) => (
          <ResourceDisplay
            key={index}
            iconImagePath={getResourceIconPath(type)}
            amount={useAppSelector(selectResource(type))}
          />
        ))}
    </div>
  );
};

export default Resources;
