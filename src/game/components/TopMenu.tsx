import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import {
  SceneType,
  setSceneType,
  setUIState,
  UIState,
  UIStateType,
} from "../../data/properties";
import { selectIsLoading } from "../../data/errors";
import TitaniumFrame from "./TitaniumFrame";
import HelpButton from "./Buttons/HelpButton";
import MarketButton from "./Buttons/MarketButton";
import { startGuide } from "../../data/guides";
import { GuideType } from "../../data/models";
import PlayerInfo from "./PlayerInfo";
import { MarketTabState, setTabState } from "../../data/market";
import PlanetButton from "./Buttons/PlanetButton";
import RedeemButton from "./Buttons/RedeemButton";

const TopMenu = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const onClickWithdraw = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.WithdrawPopup } }));
    }
  };

  const onClickDeposit = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.DepositPopup } }));
    }
  };

  function onClickHelp() {
    dispatch(startGuide({ guideType: GuideType.First }));
    dispatch(setUIState({ uIState: { type: UIStateType.GuidePopup } }));
  }

  function onClickPlanet() {
    dispatch(setSceneType({ sceneType: SceneType.Planet }));
  }

  function onClickMarket() {
    dispatch(setTabState(MarketTabState.Inventory));
    dispatch(setSceneType({ sceneType: SceneType.Market }));
  }

  function onClickRedeem() {
    dispatch(setSceneType({ sceneType: SceneType.Redeem }));
  }

  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <div className="top-info">
        <TitaniumFrame
          onClickWithdraw={onClickWithdraw}
          onClickDeposit={onClickDeposit}
        />
        <AccountInfo />
        <Resources />
        <PlayerInfo />
      </div>
      <div className="top-planet">
        <PlanetButton onClick={onClickPlanet} />
      </div>
      <div className="top-market">
        <MarketButton onClick={onClickMarket} />
      </div>
      <div className="top-redeem">
        <RedeemButton onClick={onClickRedeem} />
      </div>
      <div className="top-help">
        <HelpButton onClick={onClickHelp} />
      </div>
    </div>
  );
};

export default TopMenu;
