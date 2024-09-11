import React from "react";
import RareResourceDisplay from "./RareResourceDisplay";
import { useAppSelector } from "../../app/hooks";

import {
  getAttributeIconPath,
  attributeTypes,
} from "../../data/automata/models";
import { selectSelectedAttributes } from "../../data/automata/creatures";
import "./RareResources.css";

const RareResources = () => {
  return (
    <div className="top-rare-resources-container">
      {attributeTypes.map((type, index) => (
        <RareResourceDisplay
          key={index}
          iconImagePath={getAttributeIconPath(type)}
          amount={useAppSelector(selectSelectedAttributes(type))}
        />
      ))}
    </div>
  );
};

export default RareResources;
