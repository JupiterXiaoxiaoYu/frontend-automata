import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/request"
import { ConfirmPopupInfo, ResourceAmountPair, emptyConfirmPopupInfo, emptyResources, redeemEnergyCooldownBase } from "./models"

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
  WithdrawPopupLoading,
  DepositPopup,
  DepositPopupLoading,
  UpgradePopup,
  PlayUpgradeAnimation,
  UnlockPopup,
  RebootPopup,
  RebootPopupLoading,
  PlayUnlockAnimation,
  NewProgramPopup,
  PlayNewProgramAnimation,
  ConfirmPopup,
  CollectInterestPopup,
  CollectInterestPopupLoading,
  RocketPopup,
  RocketPopupLoading,
}

export enum TutorialType{
  None,
  Creature,
  Program,
}

interface PropertiesState {
    uIState: UIState;
    tutorialType: TutorialType;
    globalTimer: number;
    nonce: string;
    showGuide: boolean;
    hasRocket: boolean;
    selectedCreatureDiffResources: ResourceAmountPair[];
    currentCost: number;
    redeemCostBase: number;
    redeemRewardBase: number;
    redeemInfo: number[];
    confirmPopupInfo: ConfirmPopupInfo;
    level: number;
    exp: number;
    energy: number;
    redeemEnergy: number;
    lastRedeemEnergy: number;
    interest: number;
    bountyPool: number;
}

const initialState: PropertiesState = {
    uIState: UIState.Init,
    tutorialType: TutorialType.None,
    globalTimer: 0,
    nonce: "0",
    showGuide: false,
    hasRocket: false,
    selectedCreatureDiffResources: [],
    currentCost: 0,
    redeemCostBase: 0,
    redeemRewardBase: 0,
    redeemInfo: [],
    confirmPopupInfo: emptyConfirmPopupInfo,
    level: 1,
    exp: 0,
    energy: 0,
    redeemEnergy: 0,
    lastRedeemEnergy: 0,
    interest: 0,
    bountyPool: 0,
};

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
      setUIState: (state, action) => {
        state.uIState = action.payload.uIState;
      },
      setTutorialType: (state, action) => {
        state.tutorialType = action.payload.tutorialType;
      },
      setHasRocket: (state, action) => {
        state.hasRocket = action.payload.hasRocket;
      },
      setConfirmPopupInfo: (state, action) => {
        state.confirmPopupInfo = action.payload.confirmPopupInfo;
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
          if (state.showGuide){
            state.uIState = UIState.Guide;
            state.tutorialType = TutorialType.Creature;
          } else {
            state.uIState = UIState.Idle;
          }
        }
        state.globalTimer = action.payload.globalTimer;
        state.nonce = action.payload.nonce;
        state.currentCost = action.payload.currentCost;
        state.redeemInfo = action.payload.redeemInfo;
        state.level = action.payload.level;
        state.exp = action.payload.exp;
        state.energy = action.payload.energy;
        state.lastRedeemEnergy = action.payload.lastRedeemEnergy;
        state.interest = action.payload.interest;
        state.bountyPool = action.payload.bountyPool;
        state.redeemEnergy = action.payload.redeemEnergy;
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
export const selectTutorialType = (state: RootState) => state.automata.properties.tutorialType;
export const selectGlobalTimer = (state: RootState) => state.automata.properties.globalTimer;
export const selectNonce = (state: RootState) => BigInt(state.automata.properties.nonce);
export const selectHasRocket = (state: RootState) => state.automata.properties.hasRocket;
export const selectCreatureUnlockCost = (state: RootState) => BigInt(state.automata.properties.nonce);
export const selectCurrentCost = (state: RootState) => state.automata.properties.currentCost;
export const selectRedeemCostBase = (state: RootState) => state.automata.properties.redeemCostBase;
export const selectRedeemRewardBase = (state: RootState) => state.automata.properties.redeemRewardBase;
export const selectRedeemInfo = (state: RootState) => state.automata.properties.redeemInfo;
export const selectLevel = (state: RootState) => state.automata.properties.level;
export const selectExp = (state: RootState) => state.automata.properties.exp;
export const selectEnergy = (state: RootState) => state.automata.properties.energy;
export const selectRedeemEnergy = (state: RootState) => state.automata.properties.redeemEnergy;
export const selectRedeemEnergyCooldown = (state: RootState) => redeemEnergyCooldownBase;
export const selectLastRedeemEnergy = (state: RootState) => state.automata.properties.lastRedeemEnergy;
export const selectInterest = (state: RootState) => state.automata.properties.interest;
export const selectBountyPool = (state: RootState) => state.automata.properties.bountyPool;
export const selectConfirmPopupInfo = (state: RootState) => state.automata.properties.confirmPopupInfo;

export const { setUIState, setTutorialType, setHasRocket, setConfirmPopupInfo } = propertiesSlice.actions;
export default propertiesSlice.reducer;
