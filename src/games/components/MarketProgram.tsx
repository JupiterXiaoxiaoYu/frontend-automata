import React from "react";
import "./MarketProgram.css";
import Grid from "./Grid";
import ProgramResourceDisplay from "./ProgramResourceDisplay";
import {
  getResourceIconPath,
  getProgramIconPath,
  ResourceType,
  CommodityModel,
} from "../../data/automata/models";
import { formatTime } from "../../data/automata/creatures";
import background from "../images/backgrounds/market_card_frame.png";
import SellButton from "./Buttons/SellButton";
import BidButton from "./Buttons/BidButton";
import ListButton from "./Buttons/ListButton";

interface Props {
  commodity: CommodityModel;
  isInstalled: boolean;
  onClickBid?: () => void;
  onClickSell?: () => void;
  onClickList?: () => void;
}

const MarketProgram = ({
  commodity,
  isInstalled,
  onClickBid = undefined,
  onClickSell = undefined,
  onClickList = undefined,
}: Props) => {
  return (
    <div className="market-program-container">
      <img src={background} className="market-program-background" />
      <p className="market-program-name-text">{commodity.object.name}</p>
      <p className="market-program-time-text">
        {formatTime(commodity.object.processingTime)}
      </p>
      <img
        src={getProgramIconPath(commodity.object.type)}
        className="market-program-icon-image"
      />
      <div className="market-program-resource-grid">
        <Grid
          elementWidth={44}
          elementHeight={16}
          columnCount={2}
          rowCount={4}
          elements={commodity.object.resources.map((resource, index) => (
            <ProgramResourceDisplay
              key={index}
              iconImagePath={getResourceIconPath(resource.type)}
              amount={resource.amount}
            />
          ))}
        />
      </div>
      {!onClickList && (
        <>
          <p className="market-program-bid-title-text">Highest Bid :</p>
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="market-program-bid-icon"
          />
          <p className="market-program-bid-text">{commodity.bidPrice}</p>
          <p className="market-program-ask-title-text">Ask Price :</p>
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="market-program-ask-icon"
          />
          <p className="market-program-ask-text">{commodity.askPrice}</p>
        </>
      )}
      {isInstalled && <p className="market-program-installed-text">In use</p>}
      {onClickBid && (
        <div className="market-program-button">
          <BidButton isDisabled={false} onClick={onClickBid} />
        </div>
      )}
      {onClickSell && (
        <div className="market-program-button">
          <SellButton isDisabled={false} onClick={onClickSell} />
        </div>
      )}
      {!isInstalled && onClickList && (
        <div className="market-program-button">
          <ListButton isDisabled={false} onClick={onClickList} />
        </div>
      )}
    </div>
  );
};

export default MarketProgram;
