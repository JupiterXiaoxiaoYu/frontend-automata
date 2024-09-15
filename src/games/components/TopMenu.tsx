import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import Resources from "./Resources";
import Attributes from "./Attributes";
import WithDrawButton from "./Buttons/WithdrawButton";
import DepositButton from "./Buttons/DepositButton";
import {
  selectIsLoading,
  setUIState,
  UIState,
} from "../../data/automata/properties";

const TopMenu = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const onClickWithdraw = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.Withdraw }));
    }
  };

  const onClickDeposit = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.Deposit }));
    }
  };

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
    </div>
  );
};

export default TopMenu;
