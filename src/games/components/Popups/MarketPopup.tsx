import React, { useEffect, useRef, useState } from "react";
import background from "../../images/backgrounds/market_frame.png";
import amountBackground from "../../images/backgrounds/market_money_background.png";
import {
  MarketTabType,
  UIState,
  selectMarketTabType,
  selectNonce,
  setMarketTabType,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./MarketPopup.css";
import {
  CommodityModel,
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";
import { selectResource } from "../../../data/automata/resources";
import MarketTabButton from "../Buttons/MarketTabButton";
import PageSelector from "../PageSelector";
import Grid from "../Grid";
import MarketProgram from "../MarketProgram";
import { selectAllPrograms } from "../../../data/automata/programs";
import { getCommodity, getMarketList } from "../../express";
import {
  getBidCardTransactionCommandArray,
  getListCardTransactionCommandArray,
  getSellCardTransactionCommandArray,
} from "../../rpc";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { queryState, sendTransaction } from "../../request";
import BidAmountPopup from "./BidAmountPopup";
import ListAmountPopup from "./ListAmountPopup";
import { bnToHexLe } from "delphinus-curves/src/altjubjub";
import { LeHexBN } from "zkwasm-minirollup-rpc";
import { selectInstalledProgramIds } from "../../../data/automata/creatures";

const MarketPopup = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));
  const marketTabType = useAppSelector(selectMarketTabType);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const columnCount = 3;
  const rowCount = 2;
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementHeight, setElementHeight] = useState<number>(0);
  const [showBidAmountPopup, setShowBidAmountPopup] = useState<boolean>(false);
  const [showListAmountPopup, setShowListAmountPopup] =
    useState<boolean>(false);
  const [maxBidAmount, setMaxBidAmount] = useState<number>(0);
  const [minBidAmount, setMinBidAmount] = useState<number>(0);
  const [currentCommodityPopup, setCurrentCommodityPopup] =
    useState<CommodityModel>();
  const programs = useAppSelector(selectAllPrograms);
  const [auctionList, setAuctionList] = useState<CommodityModel[]>([]);
  const [lotList, setLotList] = useState<CommodityModel[]>([]);
  const [sellingList, setSellingList] = useState<CommodityModel[]>([]);
  const installedProgramIds = useAppSelector(selectInstalledProgramIds);
  console.log("installedProgramIds", installedProgramIds);
  const pids = l2account?.pubkey
    ? new LeHexBN(bnToHexLe(l2account?.pubkey)).toU64Array()
    : ["", "", "", ""];
  const inventoryList = programs
    .filter((program) => program.marketId == 0)
    .map((program) => {
      return {
        id: program.index,
        askPrice: 0,
        program,
        bidPrice: 0,
        bidders: [],
      };
    });
  const elements =
    marketTabType == MarketTabType.Auction
      ? auctionList.map((commodity, index) => (
          <MarketProgram
            key={index}
            isDisabled={false}
            commodity={commodity}
            onClickBid={() => onClickBid(commodity)}
          />
        ))
      : marketTabType == MarketTabType.Lot
      ? lotList.map((commodity, index) => (
          <MarketProgram
            key={index}
            isDisabled={false}
            commodity={commodity}
            onClickBid={() => onClickBid(commodity)}
          />
        ))
      : marketTabType == MarketTabType.Selling
      ? sellingList.map((commodity, index) => (
          <MarketProgram
            key={index}
            isDisabled={false}
            commodity={commodity}
            onClickSell={() => onClickSell(commodity)}
          />
        ))
      : inventoryList.map((commodity, index) => (
          <MarketProgram
            key={index}
            isDisabled={installedProgramIds.includes(commodity.program.index)}
            commodity={commodity}
            onClickList={() => onClickList(commodity)}
          />
        ));
  const [isFirst, setIsFirst] = useState<boolean>(true);

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

  const updateSellings = (markets: CommodityModel[]) => {
    const sellings = programs.filter((program) => program.marketId != 0);
    setSellingList(
      sellings.map((program) => {
        return {
          id: program.index,
          askPrice:
            markets.find((commodity) => commodity.id == program.marketId)
              ?.askPrice ?? 0,
          program,
          bidPrice:
            markets.find((commodity) => commodity.id == program.marketId)
              ?.bidPrice ?? 0,
          bidders: [],
        };
      })
    );
    return sellings.map((program) => program.marketId);
  };

  const getMarketMapAsync = async () => {
    const markets = await getMarketList();
    console.log("ret", markets);
    const sellingIds = updateSellings(markets);
    setAuctionList(
      markets.filter(
        (commodity) => sellingIds.find((id) => id == commodity.id) == undefined
      )
    );
  };

  const getLotAsync = async () => {
    const ret = await getCommodity(pids[1].toString(), pids[2].toString());
    console.log("lot", ret);
    setLotList(ret);
  };

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      getMarketMapAsync();
      getLotAsync();
    }
  }, [isFirst]);

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Creating }));
    setIsFirst(true);
  };

  const onClickAuctionTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Auction }));
  };

  const onClickLotTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Lot }));
  };

  const onClickSellingTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Selling }));
  };

  const onClickInventoryTab = () => {
    dispatch(setMarketTabType({ marketTabType: MarketTabType.Inventory }));
  };

  const onClickPrevPageButton = () => {
    // dispatch(prevPage({}));
  };

  const onClickNextPageButton = () => {
    // dispatch(nextPage({}));
  };

  const sendSellCmd = (commodity: CommodityModel) => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        sendTransaction({
          cmd: getSellCardTransactionCommandArray(nonce, commodity.id),
          prikey: l2account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ prikey: l2account!.getPrivateKey() })).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                setIsLoading(false);
              }
            }
          );
        }
      });
    }
  };

  const onClickSell = (commodity: CommodityModel) => {
    sendSellCmd(commodity);
  };

  const onConfirmBidAmount = (amount: number, commodity: CommodityModel) => {
    setShowBidAmountPopup(false);
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        sendTransaction({
          cmd: getBidCardTransactionCommandArray(nonce, commodity.id, amount),
          prikey: l2account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          getMarketMapAsync();
        }
      });
    }
  };

  const onCancelBid = () => {
    setShowBidAmountPopup(false);
  };

  const onClickBid = (commodity: CommodityModel) => {
    setCurrentCommodityPopup(commodity);
    setMaxBidAmount(Math.max(titaniumCount, commodity.askPrice));
    setMinBidAmount(commodity.bidPrice);
    setShowBidAmountPopup(true);
  };

  const onConfirmListAmount = (amount: number, commodity: CommodityModel) => {
    setShowListAmountPopup(false);
    if (!isLoading) {
      setIsLoading(true);
      const index = programs.findIndex(
        (program) => program.index == commodity.id
      );
      dispatch(
        sendTransaction({
          cmd: getListCardTransactionCommandArray(nonce, index, amount),
          prikey: l2account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ prikey: l2account!.getPrivateKey() })).then(
            async (action) => {
              if (queryState.fulfilled.match(action)) {
                await getMarketMapAsync();
                setIsLoading(false);
              }
            }
          );
        }
      });
    }
  };

  const onCancelList = () => {
    setShowListAmountPopup(false);
  };

  const onClickList = (commodity: CommodityModel) => {
    setCurrentCommodityPopup(commodity);
    setShowListAmountPopup(true);
  };

  return (
    <div className="market-popup-container">
      <div onClick={onClickCancel} className="market-popup-mask" />
      <div className="market-popup-main-container">
        <img src={background} className="market-popup-main-background" />
        {showBidAmountPopup && (
          <BidAmountPopup
            minBidAmount={minBidAmount}
            maxBidAmount={maxBidAmount}
            commodity={currentCommodityPopup!}
            onConfirmBidAmount={onConfirmBidAmount}
            onCancelBid={onCancelBid}
          />
        )}
        {showListAmountPopup && (
          <ListAmountPopup
            commodity={currentCommodityPopup!}
            onConfirmListAmount={onConfirmListAmount}
            onCancelList={onCancelList}
          />
        )}
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
        <div className="market-popup-auction-tab-button">
          <MarketTabButton
            text={"Auction"}
            onClick={onClickAuctionTab}
            isSelect={marketTabType == MarketTabType.Auction}
            normalColor="#5CFFFF"
            selectColor="black"
          />
        </div>
        <div className="market-popup-lot-tab-button">
          <MarketTabButton
            text={"Lot"}
            onClick={onClickLotTab}
            isSelect={marketTabType == MarketTabType.Lot}
            normalColor="#5CFFFF"
            selectColor="black"
          />
        </div>
        <div className="market-popup-selling-tab-button">
          <MarketTabButton
            text={"Selling"}
            onClick={onClickSellingTab}
            isSelect={marketTabType == MarketTabType.Selling}
            normalColor="#5CFFFF"
            selectColor="black"
          />
        </div>
        <div className="market-popup-inventory-tab-button">
          <MarketTabButton
            text={"Inventory"}
            onClick={onClickInventoryTab}
            isSelect={marketTabType == MarketTabType.Inventory}
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
