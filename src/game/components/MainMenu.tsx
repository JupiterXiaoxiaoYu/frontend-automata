import { useEffect, useRef } from "react";
import "./MainMenu.css";
import { selectSceneType, SceneType } from "../../data/properties";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MarketScene from "./Popups/MarketScene";
import RedeemScene from "./RedeemScene";
import PlanetScene from "./PlanetScene";

interface Props {
  localTimer: number;
}

const MainMenu = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const sceneType = useAppSelector(selectSceneType);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="main" ref={mainContainerRef}>
      {mainContainerRef && sceneType == SceneType.Planet && (
        <PlanetScene
          localTimer={localTimer}
          mainContainerRef={mainContainerRef}
        />
      )}
      {mainContainerRef && sceneType == SceneType.Redeem && (
        <RedeemScene mainContainerRef={mainContainerRef} />
      )}
      {mainContainerRef && sceneType == SceneType.Market && <MarketScene />}
    </div>
  );
};

export default MainMenu;
