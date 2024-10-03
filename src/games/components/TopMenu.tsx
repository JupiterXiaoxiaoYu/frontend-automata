import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import Attributes from "./Attributes";
import {
  selectIsLoading,
  selectIsSelectingUIState,
  setUIState,
  UIState,
} from "../../data/automata/properties";
import UpgradeButton from "./Buttons/UpgradeButton";
import RedeemButton from "./Buttons/RedeemButton";
import TitaniumFrame from "./TitaniumFrame";
import {
  clearSelectedCreatureIndex,
  selectIsNotSelectingCreature,
  selectSelectedCreature,
} from "../../data/automata/creatures";

const TopMenu = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isNotSelectingCreature = useAppSelector(selectIsNotSelectingCreature);

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

  function onClickRedeem() {
    if (!isLoading) {
      dispatch(clearSelectedCreatureIndex({}));
    }
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
      <Resources />
      <AccountInfo />
      <Attributes />
      {!isSelectingUIState && !isNotSelectingCreature && (
        <div className="top-upgrade">
          <UpgradeButton onClick={onClickUpgrade} />
        </div>
      )}
      <div className="top-redeem">
        <RedeemButton onClick={onClickRedeem} />
      </div>
    </div>
  );
};

export default TopMenu;
