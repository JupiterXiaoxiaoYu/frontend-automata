import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  getConfig,
  sendTransaction,
  queryState,
  SERVER_TICK_TO_SECOND,
} from "../game/request";
import { ConfirmPopupInfo, redeemEnergyCooldownBase } from "./models";

export enum UIStateType {
  Idle,
  WelcomePage,
  GuidePopup,
  Creating,
  Reboot,
  WithdrawPopup,
  DepositPopup,
  UpgradePopup,
  PlayUpgradeAnimation,
  UnlockPopup,
  RebootPopup,
  PlayUnlockAnimation,
  NewProgramPopup,
  PlayNewProgramAnimation,
  ConfirmPopup,
  CollectInterestPopup,
  RocketPopup,
  BidAmountPopup,
}

export type UIState =
  | { type: UIStateType.Idle }
  | { type: UIStateType.WelcomePage }
  | { type: UIStateType.GuidePopup }
  | { type: UIStateType.Creating }
  | { type: UIStateType.Reboot }
  | { type: UIStateType.WithdrawPopup }
  | { type: UIStateType.DepositPopup }
  | { type: UIStateType.UpgradePopup }
  | { type: UIStateType.PlayUpgradeAnimation }
  | { type: UIStateType.UnlockPopup }
  | { type: UIStateType.RebootPopup }
  | { type: UIStateType.PlayUnlockAnimation }
  | { type: UIStateType.NewProgramPopup }
  | { type: UIStateType.PlayNewProgramAnimation }
  | { type: UIStateType.ConfirmPopup; confirmPopupInfo: ConfirmPopupInfo }
  | { type: UIStateType.CollectInterestPopup }
  | { type: UIStateType.RocketPopup }
  | { type: UIStateType.BidAmountPopup };

export enum TutorialType {
  None,
  Creature,
  Program,
}

export enum SceneType {
  None,
  Planet,
  Redeem,
  Market,
}

interface PropertiesState {
  uIState: UIState;
  sceneType: SceneType;
  tutorialType: TutorialType;
  globalTimer: number;
  nonce: string;
  hasRocket: boolean;
  currentCost: number;
  redeemCostBase: number;
  redeemRewardBase: number;
  redeemInfo: number[];
  level: number;
  exp: number;
  energy: number;
  redeemEnergy: number;
  lastRedeemEnergy: number;
  interest: number;
  bountyPool: number;
  scenarioRatio: number;
}

const initialState: PropertiesState = {
  tutorialType: TutorialType.None,
  uIState: { type: UIStateType.WelcomePage },
  sceneType: SceneType.Planet,
  globalTimer: 0,
  nonce: "0",
  hasRocket: false,
  currentCost: 0,
  redeemCostBase: 0,
  redeemRewardBase: 0,
  redeemInfo: [],
  level: 1,
  exp: 0,
  energy: 0,
  redeemEnergy: 0,
  lastRedeemEnergy: 0,
  interest: 0,
  bountyPool: 0,
  scenarioRatio: 1,
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setUIState: (state, action) => {
      state.uIState = action.payload.uIState;
    },
    setSceneType: (state, action) => {
      state.sceneType = action.payload.sceneType;
    },
    setTutorialType: (state, action) => {
      state.tutorialType = action.payload.tutorialType;
    },
    setHasRocket: (state, action) => {
      state.hasRocket = action.payload.hasRocket;
    },
    setScenarioRatio: (state, action) => {
      state.scenarioRatio = action.payload.scenarioRatio;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.redeemCostBase = action.payload.bounty_cost_base;
        state.redeemRewardBase = action.payload.bounty_reward_base;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        console.log("send transaction fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
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
        console.log(`query state rejected: ${action.payload}`);
      });
  },
});

export const selectIsSelectingUIState = (state: RootState) =>
  state.properties.uIState.type == UIStateType.Creating ||
  state.properties.uIState.type == UIStateType.UnlockPopup ||
  state.properties.uIState.type == UIStateType.Reboot ||
  state.properties.uIState.type == UIStateType.RebootPopup;
export const selectUIState = (state: RootState) => state.properties.uIState;
export const selectSceneType = (state: RootState) => state.properties.sceneType;
export const selectTutorialType = (state: RootState) =>
  state.properties.tutorialType;
export const selectGlobalTimer = (state: RootState) =>
  state.properties.globalTimer;
export const selectNonce = (state: RootState) => BigInt(state.properties.nonce);
export const selectHasRocket = (state: RootState) => state.properties.hasRocket;
export const selectCreatureUnlockCost = (state: RootState) =>
  BigInt(state.properties.nonce);
export const selectCurrentCost = (state: RootState) =>
  state.properties.currentCost;
export const selectRedeemCostBase = (state: RootState) =>
  state.properties.redeemCostBase;
export const selectRedeemRewardBase = (state: RootState) =>
  state.properties.redeemRewardBase;
export const selectRedeemInfo = (state: RootState) =>
  state.properties.redeemInfo;
export const selectLevel = (state: RootState) => state.properties.level;
export const selectExp = (state: RootState) => state.properties.exp;
export const selectEnergy = (state: RootState) => state.properties.energy;
export const selectRedeemEnergy = (state: RootState) =>
  state.properties.redeemEnergy;
export const selectRedeemEnergyCooldown = (state: RootState) =>
  redeemEnergyCooldownBase;
export const selectLastRedeemEnergy = (state: RootState) =>
  state.properties.lastRedeemEnergy;
export const selectInterest = (state: RootState) => state.properties.interest;
export const selectBountyPool = (state: RootState) =>
  state.properties.bountyPool;
export const selectScenarioRatio = (state: RootState) =>
  state.properties.scenarioRatio;

export const {
  setUIState,
  setSceneType,
  setTutorialType,
  setHasRocket,
  setScenarioRatio,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
