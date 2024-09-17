import React, { useEffect, useState, useRef } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuProgram from "./MainMenuProgram";
import ConfirmButton from "./Buttons/CreatureConfirmButton";
import UnlockButton from "./Buttons/CreatureUnlockButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/CreatureRebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import Rocket from "./Rocket";
import { getTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../data/accountSlice";
import { sendTransaction, queryState } from "../request";
import { getCreatureIconPath, ProgramInfo } from "../../data/automata/models";
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
} from "../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import SummaryMenu from "./SummaryMenu";

interface Props {
  localTimer: number;
}

const MainMenu = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
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
  const showSummaryMenu = isNotSelectingCreature && uIState != UIState.Guide;
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  function onClickUnlock() {
    if (uIState == UIState.Creating) {
      setShowUnlockAnimation(true);
      setTimeout(() => {
        setShowUnlockAnimation(false);
        onClickConfirm();
      }, 1000);
    }
  }

  function onClickConfirm() {
    if (!isLoading) {
      // bugs here, after creating a new creature, the list will refresh unproperly.
      // fix it after UI done polishing creature list since it may change the layout of the creating creature.
      const isCreating = uIState == UIState.Creating;
      dispatch(setUIState({ uIState: UIState.Loading }));
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(
            nonce,
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            isCreating
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ cmd: [], prikey: l2account!.address })).then(
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

  function onClickUpgrade() {
    if (!isLoading && !isSelectingUIState) {
      dispatch(setUIState({ uIState: UIState.Upgrade }));
    }
  }

  const currentProgramInfo = useAppSelector(
    isSelectingUIState || isLoading
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(localTimer)
  );

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
            <button
              className="main-circle-upgrade-button"
              onClick={onClickUpgrade}
            />
            <MainMenuSelectingFrame
              order={currentProgramInfo.index}
              isReady={!isLoading && !selectedCreature.isStarting}
              isCurrentProgram={!isSelectingUIState}
              isStop={selectedCreature.isProgramStop}
            />
            {showUnlockAnimation && (
              <div className="main-bot-creating-animation" />
            )}
            {selectedCreaturePrograms.map((program, index) => (
              <MainMenuProgram
                key={index}
                order={index}
                program={program}
                showContainerAnimation={isSelectingUIState}
                showProgramAnimation={
                  !selectedCreature.isStarting &&
                  !isSelectingUIState &&
                  currentProgramInfo.index == index &&
                  !selectedCreature.isProgramStop
                }
              />
            ))}
            <MainMenuWarning />
            {showConfirmButton && (
              <ConfirmButton
                isDisabled={!enableConfirmButton}
                onClick={() => onClickConfirm()}
              />
            )}
            {showUnlockButton && (
              <UnlockButton
                isDisabled={!enableUnlockButton}
                onClick={() => onClickUnlock()}
              />
            )}
            {showRebootButton && (
              <RebootButton onClick={() => onClickReboot()} />
            )}
          </div>
        </div>
      )}
      {showSummaryMenu && <SummaryMenu />}
    </div>
  );
};

export default MainMenu;
