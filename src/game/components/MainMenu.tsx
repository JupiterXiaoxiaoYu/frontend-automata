import React, { useEffect, useState, useRef } from "react";
import circleBackground from "../image/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuProgram from "./MainMenuProgram";
import CreatureConfirmButton from "./Buttons/CreatureConfirmButton";
import "./MainMenu.css";
import DiffResourcesInfo from "./DiffResourcesInfo";
import Rocket from "./Rocket";
import { getInstallProgramTransactionCommandArray } from "../rpc";
import { useWalletContext } from "zkwasm-minirollup-browser";
import { sendTransaction, queryState } from "../request";
import { getCreatureIconPath } from "../../data/models";
import {
  UIState,
  selectIsSelectingUIState,
  selectUIState,
  selectNonce,
  setUIState,
  UIStateType,
  selectSceneType,
  SceneType,
} from "../../data/properties";
import {
  LoadingType,
  selectIsLoading,
  setLoadingType,
} from "../../data/errors";
import {
  startRebootCreature,
  clearRebootCreature,
  selectIsNotSelectingCreature,
  selectSelectedCreature,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureDiffResources,
  selectSelectedCreatureListIndex,
  selectSelectedCreatureCurrentProgram,
  selectSelectedCreatureSelectingProgram,
  setNotSelectingCreature,
} from "../../data/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import MainMenuEmptyHint from "./MainMenuEmptyHint";
import MarketScene from "./Popups/MarketScene";
import RedeemScene from "./RedeemScene";
import PlanetScene from "./PlanetScene";

interface Props {
  localTimer: number;
}

const MainMenu = ({ localTimer }: Props) => {
  const sceneType = useAppSelector(selectSceneType);

  return (
    <div className="main">
      {sceneType == SceneType.Planet && <PlanetScene localTimer={localTimer} />}
      {sceneType == SceneType.Redeem && <RedeemScene />}
      {sceneType == SceneType.Market && <MarketScene />}
    </div>
  );
};

export default MainMenu;
