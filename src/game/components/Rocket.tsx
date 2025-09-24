import { useEffect, useRef, useState } from "react";
import {
  selectAutoRedeemEnergy,
  selectHasRocket,
  selectNonce,
  setHasRocket,
  setUIState,
  UIState,
  UIStateType,
} from "../../data/properties";

import "./Rocket.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCollectEnergyTransactionCommandArray } from "../rpc";
import {
  queryState,
  sendTransaction,
  useWalletContext,
} from "zkwasm-minirollup-browser";
import { pushError } from "../../data/errors";

const getRandomStartPosition = (width: number, height: number) => {
  const x = Math.random() * 0.3;
  const y = Math.random() * 0.8 + 0.2;
  return { x: x * width, y: y * height };
};

const getRandomEndPosition = (width: number, height: number) => {
  const x = Math.random() * 0.3 + 0.7;
  const y = Math.random() * 0.8 + 0.2;
  return { x: x * width, y: y * height };
};

const Rocket = () => {
  const dispatch = useAppDispatch();
  const hasRocket = useAppSelector(selectHasRocket);
  const autoRedeemEnergy = useAppSelector(selectAutoRedeemEnergy);
  const { l2Account } = useWalletContext();
  const nonce = useAppSelector(selectNonce);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const spaceRef = useRef<HTMLDivElement | null>(null);
  const [isShowingRocket, setIsShowingRocket] = useState(false);

  const onClickRocket = () => {
    dispatch(setHasRocket({ hasRocket: false }));
    setIsShowingRocket(false);
    dispatch(setUIState({ uIState: { type: UIStateType.RocketPopup } }));
    removeAnimation();
  };

  const onAnimationEnd = () => {
    setIsShowingRocket(false);
    dispatch(setHasRocket({ hasRocket: false }));
    removeAnimation();
  };

  const removeAnimation = () => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
      if (rule.name == "flyAcrossScreen") {
        styleSheet.deleteRule(i);
      }
    }
  };

  const InitRocket = () => {
    const rocketContainer = rocketRef.current;
    const spaceContainer = spaceRef.current;
    if (rocketContainer && spaceContainer) {
      setIsShowingRocket(true);
      const startPosition = getRandomStartPosition(
        spaceContainer.clientWidth,
        spaceContainer.clientHeight
      );
      const endPosition = getRandomEndPosition(
        spaceContainer.clientWidth,
        spaceContainer.clientHeight
      );
      const dx = endPosition.x - startPosition.x;
      const dy = endPosition.y - startPosition.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      rocketContainer.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px) rotate(${angle}deg)`;
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const keyframes = `
        @keyframes flyAcrossScreen {
          from { transform: translate(${startPosition.x}px, ${startPosition.y}px) rotate(${angle}deg); }
          to { transform: translate(${endPosition.x}px, ${endPosition.y}px) rotate(${angle}deg); }
        }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      rocketContainer.style.animation = `flyAcrossScreen 20s linear`;
      rocketContainer.addEventListener("animationend", onAnimationEnd);

      return () => {
        rocketContainer.removeEventListener("animationend", onAnimationEnd);
      };
    }
  };

  const claimRocket = () => {
    dispatch(
      sendTransaction({
        cmd: getCollectEnergyTransactionCommandArray(nonce),
        prikey: l2Account!.getPrivateKey(),
      })
    ).then((action: any) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(queryState(l2Account.getPrivateKey())).then((action: any) => {
          if (queryState.fulfilled.match(action)) {
            dispatch(setHasRocket({ hasRocket: false }));
          }
        });
      } else if (sendTransaction.rejected.match(action)) {
        const message = "auto claim rocket Error: " + action.payload;
        dispatch(pushError(message));
        console.error(message);
      }
    });
  };

  useEffect(() => {
    if (hasRocket) {
      if (autoRedeemEnergy) {
        console.log("claim");
        claimRocket();
      } else {
        return InitRocket();
      }
    }
  }, [hasRocket]);

  return (
    <div ref={spaceRef} className="space-container">
      <div ref={rocketRef} className="rocket-container">
        {isShowingRocket && (
          <div className="rocket-image" onClick={onClickRocket} />
        )}
      </div>
    </div>
  );
};

export default Rocket;
