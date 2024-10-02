import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import Attributes from "./Attributes";
import WithDrawButton from "./Buttons/WithdrawButton";
import DepositButton from "./Buttons/DepositButton";
import {
  selectIsLoading,
  selectIsSelectingUIState,
  setUIState,
  UIState,
} from "../../data/automata/properties";
import UpgradeButton from "./Buttons/UpgradeButton";

const TopMenu = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);

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

  function onClickUpgrade() {
    if (!isLoading && !isSelectingUIState) {
      dispatch(setUIState({ uIState: UIState.UpgradePopup }));
    }
  }

  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <div className="top-withdraw">
        <WithDrawButton onClick={onClickWithdraw} />
      </div>
      <div className="top-deposit">
        <DepositButton onClick={onClickDeposit} />
      </div>
      <AccountInfo />
      <Resources />
      <Attributes />
      {!isSelectingUIState && (
        <div className="top-upgrade">
          <UpgradeButton onClick={onClickUpgrade} />
        </div>
      )}
    </div>
  );
};

export default TopMenu;
