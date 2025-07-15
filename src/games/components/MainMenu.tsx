import React, { useEffect, useState, useRef } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuProgram from "./MainMenuProgram";
import CreatureConfirmButton from "./Buttons/CreatureConfirmButton";
import CreatureUnlockButton from "./Buttons/CreatureUnlockButton";
import "./MainMenu.css";
import CreatureRebootButton from "./Buttons/CreatureRebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import Rocket from "./Rocket";
import { getInstallProgramTransactionCommandArray } from "../rpc";
import { useWalletContext } from "zkwasm-minirollup-browser";
import { sendTransaction, queryState } from "../request";
import { getCreatureIconPath } from "../../data/automata/models";
import {
  UIState,
  selectIsSelectingUIState,
  selectUIState,
  selectNonce,
  setUIState,
  UIStateType,
} from "../../data/automata/properties";
import {
  LoadingType,
  selectIsLoading,
  setLoadingType,
} from "../../data/errors";
import {
  startRebootCreature,
  clearRebootCreature,
  selectIsNotSelectingCreature,
  selectSelectedCreature,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureDiffResources,
  selectSelectedCreatureListIndex,
  selectSelectedCreatureCurrentProgram,
  selectSelectedCreatureSelectingProgram,
  setNotSelectingCreature,
  selectIsSelectingMarket,
} from "../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import RedeemMenu from "./RedeemMenu";
import RedeemButton from "./Buttons/RedeemButton";
import MainMenuEmptyHint from "./MainMenuEmptyHint";
import MarketPopup from "./Popups/MarketPopup";

interface Props {
  localTimer: number;
}

const MainMenu = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const { l2Account } = useWalletContext();

  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const isNotSelectingCreature = useAppSelector(selectIsNotSelectingCreature);
  const isSelectingMarket = useAppSelector(selectIsSelectingMarket);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const selectedCreatureDiffResources = useAppSelector(
    selectSelectedCreatureDiffResources
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isCreatingUIState = uIState.type == UIStateType.Creating;
  const showConfirmButton = uIState.type == UIStateType.Reboot;
  const enableConfirmButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const showUnlockButton = uIState.type == UIStateType.Creating;
  const enableUnlockButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const isLoading = useAppSelector(selectIsLoading);
  const showRebootButton = uIState.type == UIStateType.Idle;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const showTaskMenu =
    isNotSelectingCreature && uIState.type != UIStateType.GuidePopup;
  const showMarketPopup = isSelectingMarket;
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [showUpgradeAnimation, setShowUpgradeAnimation] = useState(false);

  function onClickUnlock() {
    if (uIState.type == UIStateType.Creating) {
      dispatch(setUIState({ uIState: { type: UIStateType.UnlockPopup } }));
    }
  }

  function playUnlockAnimation(onAnimationEnd: () => void) {
    setShowUnlockAnimation(true);
    setTimeout(() => {
      setShowUnlockAnimation(false);
      onAnimationEnd();
    }, 1000);
  }

  function playUpgradeAnimation(onAnimationEnd: () => void) {
    setShowUpgradeAnimation(true);
    setTimeout(() => {
      setShowUpgradeAnimation(false);
      onAnimationEnd();
    }, 1000);
  }

  function sendUpdateProgram() {
    if (!isLoading) {
      // bugs here, after creating a new creature, the list will refresh unproperly.
      // fix it after UI done polishing creature list since it may change the layout of the creating creature.
      dispatch(setLoadingType(LoadingType.Default));
      dispatch(
        sendTransaction({
          cmd: getInstallProgramTransactionCommandArray(
            nonce,
            selectedCreature.programIndexes.map((index: any) => index!),
            selectedCreatureIndexForRequestEncode,
            true
          ),
          prikey: l2Account!.getPrivateKey(),
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState(l2Account.getPrivateKey())).then((action) => {
            if (queryState.fulfilled.match(action)) {
              dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
              dispatch(setLoadingType(LoadingType.None));
              dispatch(clearRebootCreature({}));
            } else {
              dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
              dispatch(setLoadingType(LoadingType.None));
              dispatch(clearRebootCreature({}));
            }
          });
        } else if (sendTransaction.rejected.match(action)) {
          dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
          dispatch(setLoadingType(LoadingType.None));
        }
      });
    }
  }

  function onClickReboot() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.Reboot } }));
      dispatch(startRebootCreature({}));
    }
  }

  function onClickConfirmReboot() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.RebootPopup } }));
    }
  }

  function onClickRedeem() {
    if (!isLoading) {
      dispatch(setNotSelectingCreature({}));
    }
  }

  const currentProgramInfo = useAppSelector(
    isSelectingUIState || isLoading
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(localTimer)
  );

  useEffect(() => {
    if (uIState.type == UIStateType.PlayUnlockAnimation) {
      playUnlockAnimation(() => sendUpdateProgram());
    } else if (uIState.type == UIStateType.PlayUpgradeAnimation) {
      playUpgradeAnimation(() => sendUpdateProgram());
    }
  }, [uIState]);

  return (
    <div className="main">
      <Rocket />
      {!isNotSelectingCreature && !isSelectingMarket && (
        <div className="main-content">
          <div className="main-info-container">
            <DiffResourcesInfo diffResources={selectedCreatureDiffResources} />
          </div>
          <div className="main-circle-container">
            <MainMenuProgressBar
              programName={currentProgramInfo.program?.name ?? ""}
              remainTime={currentProgramInfo.remainTime}
              progress={currentProgramInfo.progress}
              iconPath={getCreatureIconPath(selectedCreature.creatureType)}
              isStarting={selectedCreature.isStarting}
              isCreating={isCreatingUIState}
              showAnimation={showUnlockAnimation}
            />
            <img src={circleBackground} className="main-circle-background" />

            <MainMenuSelectingFrame
              order={currentProgramInfo.index}
              isReady={!isLoading && !selectedCreature.isStarting}
              isCurrentProgram={!isSelectingUIState}
              isStop={selectedCreature.isProgramStop}
            />
            {selectedCreaturePrograms.map((program, index) =>
              program == null ? (
                <MainMenuEmptyHint key={index} order={index} />
              ) : null
            )}
            {showUnlockAnimation && (
              <div className="main-bot-unlock-animation" />
            )}
            {showUpgradeAnimation && (
              <div className="main-bot-upgrade-animation" />
            )}
            <div className="main-menu-program-container">
              {selectedCreaturePrograms.map((program, index) => (
                <MainMenuProgram
                  key={index}
                  order={index}
                  program={program}
                  showContainerAnimation={isSelectingUIState}
                  showProgramAnimation={
                    !selectedCreature.isStarting &&
                    !isSelectingUIState &&
                    !isLoading &&
                    uIState.type != UIStateType.UnlockPopup &&
                    uIState.type != UIStateType.PlayUnlockAnimation &&
                    currentProgramInfo.index == index &&
                    !selectedCreature.isProgramStop
                  }
                />
              ))}
            </div>
            <MainMenuWarning />
            {showConfirmButton && (
              <CreatureConfirmButton
                isDisabled={!enableConfirmButton}
                onClick={onClickConfirmReboot}
              />
            )}
            {showUnlockButton && (
              <CreatureUnlockButton
                isDisabled={!enableUnlockButton}
                onClick={() => onClickUnlock()}
              />
            )}
            {showRebootButton && (
              <CreatureRebootButton onClick={() => onClickReboot()} />
            )}
            {!isNotSelectingCreature && !isSelectingMarket && (
              <div className="main-redeem">
                <RedeemButton onClick={onClickRedeem} />
              </div>
            )}
          </div>
        </div>
      )}
      {showTaskMenu && <RedeemMenu />}
      {showMarketPopup && <MarketPopup />}
    </div>
  );
};

export default MainMenu;
