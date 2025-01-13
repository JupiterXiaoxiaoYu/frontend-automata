import background from "../../images/backgrounds/withdraw_frame.png";
import amountBackground from "../../images/backgrounds/withdraw_amount_background.png";
import ConfirmButton from "../Buttons/ConfirmButton";
import {
  UIState,
  selectCurrentCost,
  selectNonce,
  selectUIState,
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
import GainEnergy from "../GainEnergy";
import energy1 from "../../images/backgrounds/energy/energy1.png";
import energy2 from "../../images/backgrounds/energy/energy2.png";
import energy3 from "../../images/backgrounds/energy/energy3.png";
import energy4 from "../../images/backgrounds/energy/energy4.png";
import energy5 from "../../images/backgrounds/energy/energy5.png";
import energy6 from "../../images/backgrounds/energy/energy6.png";
import energy7 from "../../images/backgrounds/energy/energy7.png";
import energy8 from "../../images/backgrounds/energy/energy8.png";
import energy9 from "../../images/backgrounds/energy/energy9.png";
import energy10 from "../../images/backgrounds/energy/energy10.png";
import { useEffect, useRef, useState } from "react";

interface GainEnergyProps {
  startPosition: { x: number; y: number };
  rewardAnimationDelay: number;
  shakeAnimationDelay: number;
  opacity: number;
  energyImagePath: string;
}

const gainnergyProps: GainEnergyProps[] = [
  {
    startPosition: { x: 17, y: 39 },
    rewardAnimationDelay: 0.0,
    shakeAnimationDelay: 0.88,
    opacity: 0.5,
    energyImagePath: energy5,
  },
  {
    startPosition: { x: 14, y: 30 },
    rewardAnimationDelay: 0.1,
    shakeAnimationDelay: 0.79,
    opacity: 0.54,
    energyImagePath: energy6,
  },
  {
    startPosition: { x: 31, y: 40 },
    rewardAnimationDelay: 0.2,
    shakeAnimationDelay: 0.75,
    opacity: 0.61,
    energyImagePath: energy4,
  },
  {
    startPosition: { x: 0, y: 28 },
    rewardAnimationDelay: 0.3,
    shakeAnimationDelay: 0.51,
    opacity: 0.76,
    energyImagePath: energy9,
  },
  {
    startPosition: { x: 40, y: 34 },
    rewardAnimationDelay: 0.4,
    shakeAnimationDelay: 0.25,
    opacity: 0.8,
    energyImagePath: energy3,
  },
  {
    startPosition: { x: 37, y: 33 },
    rewardAnimationDelay: 0.5,
    shakeAnimationDelay: 0.75,
    opacity: 0.52,
    energyImagePath: energy1,
  },
  {
    startPosition: { x: 20, y: 39 },
    rewardAnimationDelay: 0.6,
    shakeAnimationDelay: 0.69,
    opacity: 0.51,
    energyImagePath: energy2,
  },
  {
    startPosition: { x: 10, y: 20 },
    rewardAnimationDelay: 0.7,
    shakeAnimationDelay: 0.05,
    opacity: 0.77,
    energyImagePath: energy10,
  },
  {
    startPosition: { x: 34, y: 34 },
    rewardAnimationDelay: 0.8,
    shakeAnimationDelay: 0.03,
    opacity: 0.77,
    energyImagePath: energy7,
  },
  {
    startPosition: { x: 7, y: 32 },
    rewardAnimationDelay: 0.9,
    shakeAnimationDelay: 0.89,
    opacity: 0.52,
    energyImagePath: energy8,
  },
];

const RocketPopup = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const nonce = useAppSelector(selectNonce);
  const uIState = useAppSelector(selectUIState);
  const titaniumCount = useAppSelector(selectResource(ResourceType.Titanium));
  const [rewardAnimation, setRewardAnimation] = useState(false);
  const [finishQuery, setFinishQuery] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const getEndPosition = (parentContainer: HTMLDivElement | null) => {
    return parentContainer == null
      ? {
          x: 0,
          y: 0,
        }
      : {
          x: -(parentContainer.clientWidth / 2 - 220),
          y: -(parentContainer.clientHeight / 2 + 30),
        };
  };
  const endPosition = getEndPosition(parentRef && parentRef.current);

  const onClickConfirm = () => {
    if (titaniumCount < redeemEnergyTitaniumCost) {
      return;
    }
    if (uIState == UIState.RocketPopup) {
      dispatch(setUIState({ uIState: UIState.RocketPopupLoading }));
      setFinishQuery(false);
      setRewardAnimation(true);
      dispatch(
        sendTransaction({
          cmd: getCollectEnergyTransactionCommandArray(nonce),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ prikey: l2account!.address })).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                setFinishQuery(true);
              }
            }
          );
        }
      });
    }
  };

  const onClickCancel = () => {
    dispatch(setUIState({ uIState: UIState.Creating }));
  };

  const onAnimationEnd = () => {
    if (rewardAnimation) {
      setRewardAnimation(false);
    }
  };

  useEffect(() => {
    if (!rewardAnimation && finishQuery) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  }, [rewardAnimation, finishQuery]);

  return (
    <div ref={parentRef} className="rocket-popup-container">
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
      <div className="rocket-popup-energy-animation-container">
        {gainnergyProps.map((prop, index) => (
          <GainEnergy
            key={index}
            animationIndex={index}
            rewardAnimation={rewardAnimation}
            onAnimationEnd={
              index == 0
                ? onAnimationEnd
                : () => {
                    /* */
                  }
            }
            startPosition={prop.startPosition}
            endPosition={endPosition}
            rewardAnimationDelay={prop.rewardAnimationDelay}
            shakeAnimationDelay={prop.shakeAnimationDelay}
            opacity={prop.opacity}
            energyImagePath={prop.energyImagePath}
          />
        ))}
      </div>
    </div>
  );
};

export default RocketPopup;
