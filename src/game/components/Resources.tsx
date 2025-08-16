import React from "react";
import { useAppSelector } from "../../app/hooks";
import "./Resources.css";

import { selectResource } from "../../data/resources";
import {
  getResourceDescriptionText,
  getResourceIconPath,
  getResourceNameText,
  ResourceType,
  resourceTypes,
} from "../../data/models";
import ResourceDisplay from "./ResourceDisplay";

interface Props {
  fontSize: number;
}

const Resources = ({ fontSize }: Props) => {
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
            fontSize={fontSize}
          />
        ))}
    </div>
  );
};

export default Resources;
