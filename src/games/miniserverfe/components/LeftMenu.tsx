import React, { useEffect, useRef, useState } from "react";
import leftMiddleBar from "../images/backgrounds/left_middle_bar.png";
import leftCornerBar from "../images/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";
import NewButton from "./Buttons/NewButton";
import Grid from "./Grids/Grid";
import Creature from "./Creature";

const LeftMenu = () => {
  const [creatureGridHeight, setCreatureGridHeight] = useState(0);
  const creatureGridRef = useRef<HTMLInputElement>(null);
  const updateCreatureGridHeight = () => {
    if (creatureGridRef.current) {
      setCreatureGridHeight(creatureGridRef.current.offsetHeight);
    }
  };
  const creatureGridElementWidth = 75;
  const creatureGridElementHeight = 90;
  const CreatureGridColumnCount = 2;
  const CreatureGridRowCount = Math.floor(
    creatureGridHeight / creatureGridElementHeight
  );

  useEffect(() => {
    updateCreatureGridHeight();
    window.addEventListener("resize", updateCreatureGridHeight);
    return () => {
      window.removeEventListener("resize", updateCreatureGridHeight);
    };
  }, []);

  return (
    <div className="left">
      <div className="left-top"></div>
      <div className="left-middle"></div>
      <div className="left-bottom"></div>
      <NewButton positionClass={"left-new-button-position"} />
      <UpButton positionClass={"left-up-button-position"} />
      <div ref={creatureGridRef} className="left-creature-grid">
        <Grid
          elementWidth={creatureGridElementWidth}
          elementHeight={creatureGridElementHeight}
          columnCount={CreatureGridColumnCount}
          rowCount={CreatureGridRowCount}
          elements={[<Creature />, <Creature />, <Creature />]}
        />
      </div>
      <img src={leftMiddleBar} className="left-middle-bar" />
      <img src={leftCornerBar} className="left-corner-bar" />
      <DownButton positionClass={"left-down-button-position"} />
    </div>
  );
};

export default LeftMenu;
