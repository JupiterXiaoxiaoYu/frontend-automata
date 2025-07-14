import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getConfig,
  sendTransaction,
  queryState,
  SERVER_TICK_TO_SECOND,
} from "../../games/request";
import {
  ConfirmPopupInfo,
  ResourceAmountPair,
  emptyConfirmPopupInfo,
  redeemEnergyCooldownBase,
} from "./models";

export enum UIState {
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
  BidAmountPopup,
  BidAmountPopupLoading,
}

export enum TutorialType {
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
  name: "properties",
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
        state.redeemCostBase = action.payload.bounty_cost_base;
        state.redeemRewardBase = action.payload.bounty_reward_base;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        if (state.uIState == UIState.CreatePlayer) {
          state.uIState = UIState.QueryState;
        }
        console.log("send transaction fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        if (state.uIState == UIState.QueryState) {
          if (state.showGuide) {
            state.uIState = UIState.Guide;
            state.tutorialType = TutorialType.Creature;
          } else {
            state.uIState = UIState.Idle;
          }
        }

        if (action.payload.player) {
          state.globalTimer =
            action.payload.state.counter * SERVER_TICK_TO_SECOND;
          state.nonce = action.payload.player.nonce;
          state.currentCost = action.payload.player.data.current_cost;
          state.redeemInfo = action.payload.player.data.redeem_info;
          state.level = action.payload.player.data.level;
          state.exp = action.payload.player.data.exp;
          state.energy = action.payload.player.data.energy;
          state.lastRedeemEnergy = action.payload.player.data.last_check_point;

          const level = action.payload.player.data.level;
          const interestInfo = action.payload.player.data.last_interest_stamp;
          const serverTickBn = BigInt(action.payload.state.counter);
          const lastInterestStamp = BigInt(interestInfo) & 0xffffffffn;
          const balance = BigInt(interestInfo) >> 32n;
          const delta = serverTickBn - lastInterestStamp;
          state.interest = Number(
            (BigInt(level) * balance * delta) / (10000n * 17280n)
          );
          state.bountyPool = action.payload.player.data.bounty_pool;
          state.redeemEnergy =
            Math.floor(Math.log2(Number(balance / 10000n) + 1)) * level;
        }
      })
      .addCase(queryState.rejected, (state, action) => {
        if (state.uIState == UIState.QueryState) {
          state.uIState = UIState.CreatePlayer;
          state.showGuide = true;
        }
        console.log(`query state rejected: ${action.payload}`);
      });
  },
});

export const selectIsLoading = (state: RootState) =>
  state.automata.properties.uIState == UIState.Loading;
export const selectIsSelectingUIState = (state: RootState) =>
  state.automata.properties.uIState == UIState.Creating ||
  state.automata.properties.uIState == UIState.Reboot;
export const selectUIState = (state: RootState) =>
  state.automata.properties.uIState;
export const selectTutorialType = (state: RootState) =>
  state.automata.properties.tutorialType;
export const selectGlobalTimer = (state: RootState) =>
  state.automata.properties.globalTimer;
export const selectNonce = (state: RootState) =>
  BigInt(state.automata.properties.nonce);
export const selectHasRocket = (state: RootState) =>
  state.automata.properties.hasRocket;
export const selectCreatureUnlockCost = (state: RootState) =>
  BigInt(state.automata.properties.nonce);
export const selectCurrentCost = (state: RootState) =>
  state.automata.properties.currentCost;
export const selectRedeemCostBase = (state: RootState) =>
  state.automata.properties.redeemCostBase;
export const selectRedeemRewardBase = (state: RootState) =>
  state.automata.properties.redeemRewardBase;
export const selectRedeemInfo = (state: RootState) =>
  state.automata.properties.redeemInfo;
export const selectLevel = (state: RootState) =>
  state.automata.properties.level;
export const selectExp = (state: RootState) => state.automata.properties.exp;
export const selectEnergy = (state: RootState) =>
  state.automata.properties.energy;
export const selectRedeemEnergy = (state: RootState) =>
  state.automata.properties.redeemEnergy;
export const selectRedeemEnergyCooldown = (state: RootState) =>
  redeemEnergyCooldownBase;
export const selectLastRedeemEnergy = (state: RootState) =>
  state.automata.properties.lastRedeemEnergy;
export const selectInterest = (state: RootState) =>
  state.automata.properties.interest;
export const selectBountyPool = (state: RootState) =>
  state.automata.properties.bountyPool;
export const selectConfirmPopupInfo = (state: RootState) =>
  state.automata.properties.confirmPopupInfo;

export const {
  setUIState,
  setTutorialType,
  setHasRocket,
  setConfirmPopupInfo,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
