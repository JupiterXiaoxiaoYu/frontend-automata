import React from "react";
import { useAppSelector } from "../../app/hooks";
import "./Resources.css";

import { selectResource } from "../../data/automata/resources";
import {
  getResourceDescriptionText,
  getResourceIconPath,
  getResourceNameText,
  ResourceType,
  resourceTypes,
} from "../../data/automata/models";
import ResourceDisplay from "./ResourceDisplay";

const Resources = () => {
  return (
    <div className="top-resources-container">
      {resourceTypes
        .filter((type) => type != ResourceType.Titanium)
        .map((type, index) => (
          <ResourceDisplay
            key={index}
            iconImagePath={getResourceIconPath(type)}
            title={getResourceNameText(type)}
            description={getResourceDescriptionText(type)}
            amount={useAppSelector(selectResource(type))}
          />
        ))}
    </div>
  );
};

export default Resources;
