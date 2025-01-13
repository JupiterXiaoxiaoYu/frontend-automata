import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import {
  UIState,
  selectCurrentCost,
  selectNonce,
  setUIState,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./RocketPopup.css";
import {
  getResourceIconPath,
  redeemEnergyAmount,
  redeemEnergyTitaniumCost,
  ResourceType,
} from "../../../data/automata/models";
import { selectResource } from "../../../data/automata/resources";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { queryState, sendTransaction } from "../../request";
import { getCollectEnergyTransactionCommandArray } from "../../rpc";

const RocketPopup = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));

  const onClickConfirm = () => {
    if (titaniumCount < redeemEnergyTitaniumCost) {
      return;
    }
    dispatch(setUIState({ uIState: UIState.Loading }));
    dispatch(
      sendTransaction({
        cmd: getCollectEnergyTransactionCommandArray(nonce),
        prikey: l2account!.address,
      })
    ).then((action) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(queryState({ prikey: l2account!.address })).then((action) => {
          if (queryState.fulfilled.match(action)) {
            dispatch(setUIState({ uIState: UIState.Idle }));
          }
        });
      }
    });
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Creating }));
  };

  return (
    <div className="rocket-popup-container">
      <div onClick={onClickCancel} className="rocket-popup-mask" />
      <div className="rocket-popup-main-container">
        <img src={background} className="rocket-popup-main-background" />
        <p className="rocket-popup-title-text">
          Redeem {redeemEnergyAmount} Energy
        </p>
        <p className="rocket-popup-subtitle-text">Cost</p>
        <div className="rocket-popup-cost-container">
          <img
            src={getResourceIconPath(ResourceType.Titanium)}
            className="rocket-popup-cost-icon"
          />
          <p className="rocket-popup-cost-text">{redeemEnergyTitaniumCost}</p>
          <img
            src={amountBackground}
            className="rocket-popup-cost-background"
          />
        </div>
        <div className="rocket-popup-confirm-button">
          <ConfirmButton
            isDisabled={titaniumCount < redeemEnergyTitaniumCost}
            onClick={onClickConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default RocketPopup;
