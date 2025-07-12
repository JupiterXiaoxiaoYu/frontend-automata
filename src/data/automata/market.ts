import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  emptyMarketTabData,
  emptyProgramModel,
  MarketTabData,
  ProgramModel,
} from "./models";

export enum MarketTabState {
  Inventory,
  Selling,
  Auction,
  Lot,
}
export interface MarketState {
  tabState: MarketTabState;
  inventoryTab: MarketTabData;
  sellingTab: MarketTabData;
  auctionTab: MarketTabData;
  lotTab: MarketTabData;
  forceUpdate: boolean;
  isInventoryChanged: boolean;
  isLoading: boolean;
}

const initialState: MarketState = {
  tabState: MarketTabState.Inventory,
  inventoryTab: emptyMarketTabData,
  sellingTab: emptyMarketTabData,
  auctionTab: emptyMarketTabData,
  lotTab: emptyMarketTabData,
  forceUpdate: false,
  isInventoryChanged: true,
  isLoading: false,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setTabState: (state, d: PayloadAction<MarketTabState>) => {
      state.tabState = d.payload;
    },
    setProgram: (state, d: PayloadAction<ProgramModel>) => {
      const index = state.inventoryTab.programs.findIndex(
        (program) => program.index === d.payload.index
      );
      if (index !== -1) {
        state.inventoryTab.programs[index] = d.payload;
      }
    },
    setInventoryTab: (state, d: PayloadAction<MarketTabData>) => {
      state.inventoryTab = d.payload;
      state.isInventoryChanged = false;
    },
    resetSellingTab: (state) => {
      state.sellingTab = emptyMarketTabData;
    },
    addSellingTab: (state, d: PayloadAction<MarketTabData>) => {
      state.sellingTab.programs.push(...d.payload.programs);
      state.sellingTab.programCount = d.payload.programCount;
    },
    resetAuctionTab: (state) => {
      state.auctionTab = emptyMarketTabData;
    },
    addAuctionTab: (state, d: PayloadAction<MarketTabData>) => {
      state.auctionTab.programs.push(...d.payload.programs);
      state.auctionTab.programCount = d.payload.programCount;
    },
    resetLotTab: (state) => {
      state.lotTab = emptyMarketTabData;
    },
    addLotTab: (state, d: PayloadAction<MarketTabData>) => {
      state.lotTab.programs.push(...d.payload.programs);
      state.lotTab.programCount = d.payload.programCount;
    },
    setMarketForceUpdate: (state, d: PayloadAction<boolean>) => {
      state.forceUpdate = d.payload;
    },
    setInventoryChanged: (state) => {
      state.isInventoryChanged = true;
    },
    setIsLoading: (state, d: PayloadAction<boolean>) => {
      state.isLoading = d.payload;
    },
  },
});

export const selectTabState = (state: RootState): MarketTabState =>
  state.automata.market.tabState;
export const selectMarketProgram =
  (tabState: MarketTabState, programIndex: number) => (state: RootState) => {
    if (tabState == MarketTabState.Inventory) {
      return state.automata.market.inventoryTab.programs[programIndex];
    } else if (tabState == MarketTabState.Selling) {
      return state.automata.market.sellingTab.programs[programIndex];
    } else if (tabState == MarketTabState.Auction) {
      return state.automata.market.auctionTab.programs[programIndex];
    } else if (tabState == MarketTabState.Lot) {
      return state.automata.market.lotTab.programs[programIndex];
    }
    return emptyProgramModel;
  };
export const selectIsInventoryChanged = (state: RootState): boolean =>
  state.automata.market.isInventoryChanged;
export const selectInventoryTab = (state: RootState): MarketTabData =>
  state.automata.market.inventoryTab;
export const selectSellingTab = (state: RootState): MarketTabData =>
  state.automata.market.sellingTab;
export const selectAuctionTab = (state: RootState): MarketTabData =>
  state.automata.market.auctionTab;
export const selectLotTab = (state: RootState): MarketTabData =>
  state.automata.market.lotTab;
export const selectMarketForceUpdate = (state: RootState): boolean =>
  state.automata.market.forceUpdate;
export const selectIsLoading = (state: RootState): boolean =>
  state.automata.market.isLoading;

export const {
  setTabState,
  setProgram,
  setInventoryTab,
  resetSellingTab,
  addSellingTab,
  resetAuctionTab,
  addAuctionTab,
  resetLotTab,
  addLotTab,
  setMarketForceUpdate,
  setInventoryChanged,
  setIsLoading,
} = marketSlice.actions;
export default marketSlice.reducer;
