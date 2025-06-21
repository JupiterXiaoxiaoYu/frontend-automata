import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import {
  selectIsLoading,
  setUIState,
  UIState,
} from "../../data/automata/properties";
import TitaniumFrame from "./TitaniumFrame";
import HelpButton from "./Buttons/HelpButton";
import MarketButton from "./Buttons/MarketButton";
import { startGuide } from "../../data/automata/guides";
import { GuideType } from "../../data/automata/models";
import PlayerInfo from "./PlayerInfo";
import { setSelectingMarket } from "../../data/automata/creatures";
import { MarketTabState, setTabState } from "../../data/automata/market";

const TopMenu = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const onClickWithdraw = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.WithdrawPopup }));
    }
  };

  const onClickDeposit = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.DepositPopup }));
    }
  };

  function onClickHelp() {
    dispatch(startGuide({ guideType: GuideType.First }));
    dispatch(setUIState({ uIState: UIState.Guide }));
  }

  function onClickMarket() {
    dispatch(setTabState(MarketTabState.Auction));
    dispatch(setSelectingMarket({}));
  }

  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <TitaniumFrame
        onClickWithdraw={onClickWithdraw}
        onClickDeposit={onClickDeposit}
      />
      <AccountInfo />
      <Resources />
      <PlayerInfo />
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
