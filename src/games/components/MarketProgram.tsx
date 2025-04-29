import React from "react";
import "./MarketProgram.css";
import Grid from "./Grid";
import ProgramResourceDisplay from "./ProgramResourceDisplay";
import {
  ProgramModel,
  getResourceIconPath,
  getProgramIconPath,
  ResourceType,
} from "../../data/automata/models";
import { formatTime } from "../../data/automata/creatures";
import background from "../images/backgrounds/market_card_frame.png";
import SellButton from "./Buttons/SellButton";

interface Props {
  program: ProgramModel;
}

const MarketProgram = ({ program }: Props) => {
  const onClickSell = () => {
    /**/
  };

  const onClickBid = () => {
    /**/
  };

  return (
    <div className="market-program-container">
      <img src={background} className="market-program-background" />
      <p className="market-program-name-text">{program.name}</p>
      <p className="market-program-time-text">
        {formatTime(program.processingTime)}
      </p>
      <img
        src={getProgramIconPath(program.type)}
        className="market-program-icon-image"
      />
      <div className="market-program-resource-grid">
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
      <p className="market-program-bid-title-text">Highest Bid:</p>
      <img
        src={getResourceIconPath(ResourceType.Titanium)}
        className="market-program-bid-icon"
      />
      <p className="market-program-bid-text">12345</p>
      <div className="market-program-button">
        <SellButton isDisabled={false} onClick={onClickSell} />
      </div>
    </div>
  );
};

export default MarketProgram;
