import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/request"
import { ResourceAmountPair, emptyResources } from "./models"

export enum UIState{
  Init,
  QueryConfig,
  QueryState,
  CreatePlayer,
  Idle,
  Loading,
  Guide,
  Creating,
  Reboot,
  WithdrawPopup,
  DepositPopup,
  UpgradePopup,
  PlayUpgradeAnimation,
  UnlockPopup,
  PlayUnlockAnimation,
  NewProgramPopup,
  PlayNewProgramAnimation,
}

interface PropertiesState {
    uIState: UIState;
    globalTimer: number;
    nonce: string;
    showGuide: boolean;
    hasRocket: boolean;
    selectedCreatureDiffResources: ResourceAmountPair[];
    currentCost: number;
    redeemCostBase: number;
    redeemRewardBase: number;
    redeemInfo: number[];
}

const initialState: PropertiesState = {
    uIState: UIState.Init,
    globalTimer: 0,
    nonce: "0",
    showGuide: false,
    hasRocket: false,
    selectedCreatureDiffResources: [],
    currentCost: 0,
    redeemCostBase: 0,
    redeemRewardBase: 0,
    redeemInfo: [],
};

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
      setUIState: (state, action) => {
        state.uIState = action.payload.uIState;
      },
      setHasRocket: (state, action) => {
        state.hasRocket = action.payload.hasRocket;
      },
    },

  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.uIState = UIState.QueryState;
        state.redeemCostBase = action.payload.redeemCostBase;
        state.redeemRewardBase = action.payload.redeemRewardBase;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        if (state.uIState == UIState.CreatePlayer){
          state.uIState = UIState.QueryState;
        }
        console.log("send transaction fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = (state.showGuide) ? UIState.Guide : UIState.Idle;
        }
        state.globalTimer = action.payload.globalTimer;
        state.nonce = action.payload.nonce;
        state.currentCost = action.payload.currentCost;
        state.redeemInfo = action.payload.redeemInfo;
        console.log("query state fulfilled");
      })
      .addCase(queryState.rejected, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = UIState.CreatePlayer;
          state.showGuide = true;
        }
        console.log(`query state rejected: ${action.payload}`);
      });
    }
});

export const selectIsLoading = (state: RootState) => state.automata.properties.uIState == UIState.Loading;
export const selectIsSelectingUIState = (state: RootState) => state.automata.properties.uIState == UIState.Creating || state.automata.properties.uIState == UIState.Reboot;
export const selectUIState = (state: RootState) => state.automata.properties.uIState;
export const selectGlobalTimer = (state: RootState) => state.automata.properties.globalTimer;
export const selectNonce = (state: RootState) => BigInt(state.automata.properties.nonce);
export const selectHasRocket = (state: RootState) => state.automata.properties.hasRocket;
export const selectCreatureUnlockCost = (state: RootState) => BigInt(state.automata.properties.nonce);
export const selectCurrentCost = (state: RootState) => state.automata.properties.currentCost;
export const selectRedeemCostBase = (state: RootState) => state.automata.properties.redeemCostBase;
export const selectRedeemRewardBase = (state: RootState) => state.automata.properties.redeemRewardBase;
export const selectRedeemInfo = (state: RootState) => state.automata.properties.redeemInfo;

export const { setUIState, setHasRocket } = propertiesSlice.actions;
export default propertiesSlice.reducer;