import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import background from "../images/backgrounds/guide_frame.png";
import Grid from "./Grid";
import {
  selectNonce,
  selectRedeemCostBase,
  selectRedeemInfo,
  selectRedeemRewardBase,
  setUIState,
  UIState,
} from "../../data/automata/properties";
import "./RedeemMenu.css";
import {
  getResourceDisabledIconPath,
  getResourceIconPath,
  ResourceType,
  resourceTypes,
} from "../../data/automata/models";
import RedeemDisplay from "./RedeemDisplay";
import RedeemDisplayEmpty from "./RedeemDisplayEmpty";
import { sendTransaction } from "../request";
import { getRedeemTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../data/accountSlice";
import { selectResource } from "../../data/automata/resources";

const RedeemMenu = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const redeemCostBase = useAppSelector(selectRedeemCostBase);
  const redeemRewardBase = useAppSelector(selectRedeemRewardBase);
  const redeemInfo = useAppSelector(selectRedeemInfo);

  const onClickRedeem = (index: number) => {
    dispatch(setUIState({ uIState: UIState.Loading }));
    dispatch(
      sendTransaction({
        cmd: getRedeemTransactionCommandArray(nonce, index),
        prikey: l2account!.address,
      })
    ).then((action) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    });
  };

  const getRedeemCostAmount = (level: number): number => {
    return 20 * Math.pow(redeemCostBase, level);
  };

  const getRedeemRewardAmount = (level: number): number => {
    return redeemRewardBase * (level + 1);
  };

  return (
    <div className="redeem-menu-container">
      <img src={background} className="redeem-menu-background" />
      <p className="redeem-resource-title-text">Task</p>
      <div className="redeem-menu-grid">
        <Grid
          columnCount={2}
          rowCount={4}
          elements={resourceTypes.map((type, index) =>
            type == ResourceType.Titanium ? (
              <RedeemDisplayEmpty />
            ) : (
              <RedeemDisplay
                key={index}
                isDisabled={
                  getRedeemCostAmount(redeemInfo[index]) >
                  useAppSelector(selectResource(type))
                }
                costIconImagePath={
                  getRedeemCostAmount(redeemInfo[index]) >
                  useAppSelector(selectResource(type))
                    ? getResourceDisabledIconPath(type)
                    : getResourceIconPath(type)
                }
                costAmount={getRedeemCostAmount(redeemInfo[index])}
                rewardIconImagePath={getResourceIconPath(ResourceType.Titanium)}
                rewardAmount={getRedeemRewardAmount(redeemInfo[index])}
                onClickRedeem={() => onClickRedeem(index)}
              />
            )
          )}
        />
      </div>
    </div>
  );
};

export default RedeemMenu;
