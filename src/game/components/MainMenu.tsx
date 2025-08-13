import { useEffect } from "react";
import "./MainMenu.css";
import { selectSceneType, SceneType } from "../../data/properties";
import { initSelectingCreatureIndex } from "../../data/creatures";
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

  useEffect(() => {
    if (sceneType == SceneType.Planet) {
      console.log("Switching to Planet Scene");
      dispatch(initSelectingCreatureIndex({}));
    }
  }, [sceneType]);

  return (
    <div className="main">
      {sceneType == SceneType.Planet && <PlanetScene localTimer={localTimer} />}
      {sceneType == SceneType.Redeem && <RedeemScene />}
      {sceneType == SceneType.Market && <MarketScene />}
    </div>
  );
};

export default MainMenu;
