import React from "react";
import AttributeDisplay from "./AttributeDisplay";
import { useAppSelector } from "../../app/hooks";

import {
  getAttributeIconPath,
  attributeTypes,
} from "../../data/automata/models";
import { selectSelectedAttributes } from "../../data/automata/creatures";
import "./Attributes.css";

const Attributes = () => {
  return (
    <div className="top-attributes-container">
      {attributeTypes.map((type, index) => (
        <AttributeDisplay
          key={index}
          iconImagePath={getAttributeIconPath(type)}
          amount={useAppSelector(selectSelectedAttributes(type))}
        />
      ))}
    </div>
  );
};

export default Attributes;
