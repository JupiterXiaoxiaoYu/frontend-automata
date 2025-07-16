import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import { setUIState, UIState, UIStateType } from "../../data/properties";
import { selectIsLoading } from "../../data/errors";
import TitaniumFrame from "./TitaniumFrame";
import HelpButton from "./Buttons/HelpButton";
import MarketButton from "./Buttons/MarketButton";
import { startGuide } from "../../data/guides";
import { GuideType } from "../../data/models";
import PlayerInfo from "./PlayerInfo";
import { setSelectingMarket } from "../../data/creatures";
import { MarketTabState, setTabState } from "../../data/market";

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

  function onClickMarket() {
    dispatch(setTabState(MarketTabState.Inventory));
    dispatch(setSelectingMarket({}));
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
      <div className="top-market">
        <MarketButton onClick={onClickMarket} />
      </div>
      <div className="top-help">
        <HelpButton onClick={onClickHelp} />
      </div>
    </div>
  );
};

export default TopMenu;
