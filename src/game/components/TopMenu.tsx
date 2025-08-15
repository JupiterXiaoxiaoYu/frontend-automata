import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import {
  SceneType,
  selectEnergy,
  selectExp,
  selectLevel,
  selectRedeemEnergy,
  selectSceneType,
  setSceneType,
  setUIState,
  UIState,
  UIStateType,
} from "../../data/properties";
import { selectIsLoading } from "../../data/errors";
import TitaniumFrame from "./TitaniumFrame";
import HelpButton from "./Buttons/HelpButton";
import { startGuide } from "../../data/guides";
import { expToLevelUp, GuideType } from "../../data/models";
import level_icon from "../image/backgrounds/player_lv.png";
import energy_icon from "../image/backgrounds/player_energy.png";
import xp_icon from "../image/backgrounds/player_xp.png";
import { MarketTabState, setTabState } from "../../data/market";
import PlanetSceneButton from "./Buttons/PlanetSceneButton";
import MarketSceneButton from "./Buttons/MarketSceneButton";
import RedeemSceneButton from "./Buttons/RedeemSceneButton";
import PlayerInfoLevelDisplay from "./PlayerInfoLevelDisplay";
import PlayerInfoDisplay from "./PlayerInfoDisplay";

const TopMenu = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const sceneType = useAppSelector(selectSceneType);
  const level = useAppSelector(selectLevel);
  const exp = useAppSelector(selectExp);
  const energy = useAppSelector(selectEnergy);
  const redeemEnergy = useAppSelector(selectRedeemEnergy);

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
    <>
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>

      <div className="top-left-info-container">
        <div className="player-info-level-container">
          <PlayerInfoLevelDisplay
            icon={level_icon}
            title={"level"}
            amount={level}
            interestRate={0.01 * level}
            description={
              "Increasing Rockets Spawn and Interest Rate When Leveling Up"
            }
          />
        </div>
        <div className="player-info-xp-container">
          <PlayerInfoDisplay
            icon={xp_icon}
            title={"xp"}
            amount={exp}
            description={`${
              expToLevelUp + level * 10 - exp
            } Exp Before Leveling Up`}
          />
        </div>
        <div className="player-info-energy-container">
          <PlayerInfoDisplay
            icon={energy_icon}
            title={"energy"}
            amount={energy}
            description={`Automatas Use Energy To Operate, you can collect ${redeemEnergy} in rocket`}
          />
        </div>
      </div>
      <div className="top-right-info-container">
        <div className="top-titanium-frame">
          <TitaniumFrame
            onClickWithdraw={onClickWithdraw}
            onClickDeposit={onClickDeposit}
          />
        </div>
        <div className="top-account-info">
          <AccountInfo />
        </div>
      </div>
      <div className="top-resources">
        <Resources />
      </div>
      <div className="top-planet">
        <PlanetSceneButton
          isDisabled={sceneType == SceneType.Planet}
          onClick={onClickPlanet}
        />
      </div>
      <div className="top-market">
        <MarketSceneButton
          isDisabled={sceneType == SceneType.Market}
          onClick={onClickMarket}
        />
      </div>
      <div className="top-redeem">
        <RedeemSceneButton
          isDisabled={sceneType == SceneType.Redeem}
          onClick={onClickRedeem}
        />
      </div>
      <div className="top-help">
        <HelpButton onClick={onClickHelp} />
      </div>
    </>
  );
};

export default TopMenu;
