import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import background from "../images/backgrounds/guide_frame.png";
import Grid from "./Grid";
import {
  selectBountyPool,
  selectInterest,
  selectNonce,
  selectRedeemCostBase,
  selectRedeemInfo,
  selectRedeemRewardBase,
  setUIState,
  UIState,
  UIStateType,
} from "../../data/automata/properties";
import "./RedeemMenu.css";
import {
  getResourceDisabledIconPath,
  getResourceIconPath,
  ResourceType,
  resourceTypes,
} from "../../data/automata/models";
import RedeemDisplay from "./RedeemDisplay";
import RedeemDisplayCollectInterest from "./RedeemDisplayCollectInterest";
import { getRedeemTransactionCommandArray } from "../rpc";
import {
  useWalletContext,
  queryState,
  sendTransaction,
} from "zkwasm-minirollup-browser";

import { selectResources } from "../../data/automata/resources";
import { LoadingType, setLoadingType } from "../../data/errors";

const RedeemMenu = () => {
  const dispatch = useAppDispatch();
  const { l2Account } = useWalletContext();
  const nonce = useAppSelector(selectNonce);
  const redeemCostBase = useAppSelector(selectRedeemCostBase);
  const redeemRewardBase = useAppSelector(selectRedeemRewardBase);
  const redeemInfo = useAppSelector(selectRedeemInfo);
  const resources = useAppSelector(selectResources);
  const interest = useAppSelector(selectInterest);
  const bountyPool = useAppSelector(selectBountyPool);
  const resourcesMap = Object.fromEntries(
    resources.map((resource: any) => [resource.type, resource.amount])
  );

  const onClickRedeem = (index: number) => {
    dispatch(setLoadingType(LoadingType.Default));
    dispatch(
      sendTransaction({
        cmd: getRedeemTransactionCommandArray(nonce, index),
        prikey: l2Account!.getPrivateKey(),
      })
    ).then((action: any) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(queryState(l2Account.getPrivateKey())).then((action: any) => {
          if (queryState.fulfilled.match(action)) {
            dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
            dispatch(setLoadingType(LoadingType.None));
          }
        });
      }
    });
  };

  const getRedeemCostAmount = (level: number): number => {
    return 20 * Math.pow(redeemCostBase, level);
  };

  const getRedeemRewardAmount = (level: number): number => {
    return redeemRewardBase * (level + 1);
  };

  const onClickCollectInterest = () => {
    dispatch(
      setUIState({ uIState: { type: UIStateType.CollectInterestPopup } })
    );
  };

  return (
    <div className="redeem-menu-container">
      <img src={background} className="redeem-menu-background" />
      <p className="redeem-resource-title-text">
        Redeem [available: {bountyPool}]{" "}
      </p>
      <div className="redeem-menu-grid">
        <Grid
          columnCount={2}
          rowCount={4}
          elements={resourceTypes.map((type, index) =>
            type == ResourceType.Titanium ? (
              <RedeemDisplayCollectInterest
                key={index}
                isDisabled={interest <= 100}
                rewardIconImagePath={getResourceIconPath(ResourceType.Titanium)}
                rewardAmount={interest}
                onClickCollectInterest={onClickCollectInterest}
              />
            ) : (
              <RedeemDisplay
                key={index}
                isDisabled={
                  getRedeemCostAmount(redeemInfo[index]) > resourcesMap[type]
                }
                costIconImagePath={
                  getRedeemCostAmount(redeemInfo[index]) > resourcesMap[type]
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
