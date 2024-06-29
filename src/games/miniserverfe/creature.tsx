import React, { useState, useEffect, useRef, memo } from 'react';
import { ObjectProperty } from './types';
import { Alert, Col, Row, OverlayTrigger, Tooltip, ProgressBar } from "react-bootstrap";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectEntityAttributes, selectExternal, setSelectedCreatureIndex, setUserActivity} from './thunk';

interface externalState {
  selectedCreatureIndex: number,
}

function CreatureTitleTooltip({name}: {name: string}) {
  return <Tooltip id={`tooltip-${name}`}><strong>{name}</strong></Tooltip>
}

export function Creature({robot, index}: {robot: ObjectProperty, index: number}) {
  const dispatch = useAppDispatch();
  const external = useAppSelector(selectExternal);
  // Convert object_id to hex string
  const objId = robot.object_id.join("");
  const beenCreated = robot.object_id.length != 0;
  let objContent = "";
  if (beenCreated) {
    objContent = BigInt(objId).toString(16);
  } else {
    objContent = "Creating";
  }

  const isSelected = external.selectedCreatureIndex == index;

  function handleClick(index: number) {
    if (isSelected)  {
      return;
    } else {
      dispatch(setSelectedCreatureIndex(index));
    }
  }
  if ((external.userActivity != "creating" && beenCreated) || external.userActivity == "creating") {
    return (
      <OverlayTrigger key={index} placement="bottom"
        overlay={<CreatureTitleTooltip name={index.toString()}></CreatureTitleTooltip>}
      >
        <div className="creature" key={index} id={String(index)}
                onClick={() => {handleClick(index);}}
                style={{ backgroundColor: isSelected ? "yellow" : "transparent" }}>
          <img className="creatureImg" src={require("./images/robot.png")} />
          <div className="objId">{ objContent }</div>
        </div>
      </OverlayTrigger>
    )
  } else {
    return <></>
  }
}


export function EntityAttributes({robot}: {robot: ObjectProperty}) {
  const entitiesInfo = useAppSelector(selectEntityAttributes);
  return (
    <div className="entity">
      {
        robot.entity.map((item, index) => {
          return <span key={index}>{entitiesInfo[index]}: {item} </span>;
        })
      }
    </div>
  )
}
