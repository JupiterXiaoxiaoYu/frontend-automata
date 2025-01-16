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
import { AccountSlice } from "zkwasm-minirollup-browser";
import { sendTransaction, queryState } from "../request";
import { getCreatureIconPath } from "../../data/automata/models";
import {
  UIState,
  selectIsLoading,
  selectIsSelectingUIState,
  selectUIState,
  selectNonce,
  setUIState,
} from "../../data/automata/properties";
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
  clearSelectedCreatureIndex,
} from "../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import RedeemMenu from "./RedeemMenu";
import RedeemButton from "./Buttons/RedeemButton";
import MainMenuEmptyHint from "./MainMenuEmptyHint";

interface Props {
  localTimer: number;
}

const MainMenu = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const isNotSelectingCreature = useAppSelector(selectIsNotSelectingCreature);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const selectedCreatureDiffResources = useAppSelector(
    selectSelectedCreatureDiffResources
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isCreatingUIState = uIState == UIState.Creating;
  const showConfirmButton = uIState == UIState.Reboot;
  const enableConfirmButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const showUnlockButton = uIState == UIState.Creating;
  const enableUnlockButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const isLoading = useAppSelector(selectIsLoading);
  const showRebootButton = uIState == UIState.Idle;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const showTaskMenu = isNotSelectingCreature && uIState != UIState.Guide;
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [showUpgradeAnimation, setShowUpgradeAnimation] = useState(false);

  function onClickUnlock() {
    if (uIState == UIState.Creating) {
      dispatch(setUIState({ uIState: UIState.UnlockPopup }));
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
      dispatch(setUIState({ uIState: UIState.Loading }));
      dispatch(
        sendTransaction({
          cmd: getInstallProgramTransactionCommandArray(
            nonce,
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            true
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ prikey: l2account!.address })).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              } else {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              }
            }
          );
        } else if (sendTransaction.rejected.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
        }
      });
    }
  }

  function onClickReboot() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.Reboot }));
      dispatch(startRebootCreature({}));
    }
  }

  function onClickConfirmReboot() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.RebootPopup }));
    }
  }

  function onClickRedeem() {
    if (!isLoading) {
      dispatch(clearSelectedCreatureIndex({}));
    }
  }

  const currentProgramInfo = useAppSelector(
    isSelectingUIState || isLoading
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(localTimer)
  );

  useEffect(() => {
    if (uIState == UIState.PlayUnlockAnimation) {
      playUnlockAnimation(() => sendUpdateProgram());
    } else if (uIState == UIState.PlayUpgradeAnimation) {
      playUpgradeAnimation(() => sendUpdateProgram());
    }
  }, [uIState]);

  return (
    <div className="main">
      <Rocket />
      {!isNotSelectingCreature && (
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
                    uIState != UIState.Loading &&
                    uIState != UIState.UnlockPopup &&
                    uIState != UIState.PlayUnlockAnimation &&
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
            {!isNotSelectingCreature && (
              <div className="main-redeem">
                <RedeemButton onClick={onClickRedeem} />
              </div>
            )}
          </div>
        </div>
      )}
      {showTaskMenu && <RedeemMenu />}
    </div>
  );
};

export default MainMenu;
