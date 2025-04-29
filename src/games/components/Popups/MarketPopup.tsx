import React, { useEffect, useRef, useState } from "react";
import background from "../../images/backgrounds/market_frame.png";
import amountBackground from "../../images/backgrounds/market_money_background.png";
import {
  MarketTabType,
  UIState,
  selectMarketTabType,
  setMarketTabType,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./MarketPopup.css";
import {
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";
import { selectResource } from "../../../data/automata/resources";
import MarketButton from "../Buttons/MarketButton";
import MarketTabButton from "../Buttons/MarketTabButton";
import PageSelector from "../PageSelector";
import Grid from "../Grid";
import MarketProgram from "../MarketProgram";
import { selectAllPrograms } from "../../../data/automata/programs";

const MarketPopup = () => {
  const dispatch = useAppDispatch();
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));
  const marketTabType = useAppSelector(selectMarketTabType);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const columnCount = 3;
  const rowCount = 2;
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementHeight, setElementHeight] = useState<number>(0);
  const programs = useAppSelector(selectAllPrograms);
  const elements =
    marketTabType == MarketTabType.Market
      ? programs.map((program, index) => (
          <MarketProgram key={index} program={program} />
        ))
      : [];

  const adjustSize = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth / columnCount;
      const height = containerRef.current.offsetHeight / rowCount;
      setElementWidth(width);
      setElementHeight(height);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, []);

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Creating }));
  };

  const onClickMarketTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Market }));
  };

  const onClickBidTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Bid }));
  };

  const onClickSellTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Sell }));
  };

  const onClickPrevPageButton = () => {
    // dispatch(prevPage({}));
  };

  const onClickNextPageButton = () => {
    // dispatch(nextPage({}));
  };

  return (
    <div className="market-popup-container">
      <div onClick={onClickCancel} className="market-popup-mask" />
      <div className="market-popup-main-container">
        <img src={background} className="market-popup-main-background" />
        <div className="market-popup-cost-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="market-popup-cost-icon"
          />
          <p className="market-popup-cost-text">{titaniumCount}</p>
          <img
            src={amountBackground}
            className="market-popup-cost-background"
          />
        </div>
        <div className="market-popup-market-tab-button">
          <MarketTabButton
            text={"Market"}
            onClick={onClickMarketTab}
            isSelect={marketTabType == MarketTabType.Market}
            normalColor="#5CFFFF"
            selectColor="black"
          />
        </div>
        <div className="market-popup-bid-tab-button">
          <MarketTabButton
            text={"Bid"}
            onClick={onClickBidTab}
            isSelect={marketTabType == MarketTabType.Bid}
            normalColor="#5CFFFF"
            selectColor="black"
          />
        </div>
        <div className="market-popup-sell-tab-button">
          <MarketTabButton
            text={"Sell"}
            onClick={onClickSellTab}
            isSelect={marketTabType == MarketTabType.Sell}
            normalColor="#5CFFFF"
            selectColor="black"
          />
        </div>

        <div ref={containerRef} className="market-popup-page-grid">
          <Grid
            elementWidth={elementWidth}
            elementHeight={elementHeight}
            columnCount={columnCount}
            rowCount={rowCount}
            elements={elements}
          />
        </div>

        <div className="market-popup-page-selector">
          <PageSelector
            currentPage={98}
            pageCount={99}
            isHorizontal={true}
            onClickPrevPageButton={onClickPrevPageButton}
            onClickNextPageButton={onClickNextPageButton}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketPopup;
