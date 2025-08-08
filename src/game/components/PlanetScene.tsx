import React, { useEffect, useState, useRef } from "react";
import circleBackground from "../image/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuProgram from "./MainMenuProgram";
import CreatureConfirmButton from "./Buttons/CreatureConfirmButton";
import "./PlanetScene.css";
import DiffResourcesInfo from "./DiffResourcesInfo";
import Rocket from "./Rocket";
import { getInstallProgramTransactionCommandArray } from "../rpc";
import { useWalletContext } from "zkwasm-minirollup-browser";
import { sendTransaction, queryState } from "../request";
import { getCreatureIconPath } from "../../data/models";
import {
  UIState,
  selectIsSelectingUIState,
  selectUIState,
  selectNonce,
  setUIState,
  UIStateType,
  selectSceneType,
  SceneType,
} from "../../data/properties";
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
  startCreatingCreature,
  changeSelectedCreature,
  selectCreaturesCurrentPrograms,
} from "../../data/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import RedeemMenu from "./RedeemScene";
import MainMenuEmptyHint from "./MainMenuEmptyHint";
import MarketPopup from "./Popups/MarketScene";
import Creature from "./Creature";
import PrevPageButton from "./Buttons/PrevPageButton";
import NextPageButton from "./Buttons/NextPageButton";
import CreatureRebootButton from "./Buttons/CreatureRebootButton";
import CreatureNewButton from "./Buttons/CreatureRebootNew";
import { Scenario } from "../script/scene/planet/scenario/scenario";

interface Props {
  localTimer: number;
}

const PlanetScene = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const { l2Account } = useWalletContext();

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
  const isCreatingUIState = uIState.type == UIStateType.Creating;
  const showConfirmRebootButton = uIState.type == UIStateType.Reboot;
  const showConfirmCreateButton = uIState.type == UIStateType.Creating;
  const enableConfirmButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const showRebootButton =
    uIState.type == UIStateType.Idle && !isNotSelectingCreature;
  const showNewCreatureButton =
    uIState.type == UIStateType.Idle && isNotSelectingCreature;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const isLoading = useAppSelector(selectIsLoading);
  const creaturesCurrentPrograms = useAppSelector(
    selectCreaturesCurrentPrograms
  );
  console.log("creaturesCurrentPrograms", creaturesCurrentPrograms);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [showUpgradeAnimation, setShowUpgradeAnimation] = useState(false);
  const [scenario, setScenario] = useState(
    new Scenario(creaturesCurrentPrograms)
  );

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

  function onClickNewCreature() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.Creating } }));
      dispatch(startCreatingCreature({}));
    }
  }

  const currentProgramInfo = useAppSelector(
    isSelectingUIState || isLoading
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(localTimer)
  );

  useEffect(() => {
    const draw = (): void => {
      if (scenario.status === "play") {
        scenario.draw({
          l2Account,
        });
        scenario.step();
      }
    };

    scenario.init();
    // Set the interval
    const intervalId = setInterval(draw, 30); // 1000ms = 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (uIState.type == UIStateType.PlayUnlockAnimation) {
      playUnlockAnimation(() => sendUpdateProgram());
    } else if (uIState.type == UIStateType.PlayUpgradeAnimation) {
      playUpgradeAnimation(() => sendUpdateProgram());
    }
  }, [uIState]);

  const onChangeSelectedCreature = (diff: number) => {
    dispatch(changeSelectedCreature({ diff }));
    dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
  };

  return (
    // <div className="planet-scene-content">
    //   <div className="planet-scene-info-container">
    //     <DiffResourcesInfo diffResources={selectedCreatureDiffResources} />
    //   </div>
    //   <div className="planet-scene-circle-container">
    //     <MainMenuProgressBar
    //       programName={currentProgramInfo.program?.name ?? ""}
    //       replanet-sceneTime={currentProgramInfo.replanet-sceneTime}
    //       progress={currentProgramInfo.progress}
    //       iconPath={getCreatureIconPath(selectedCreature.creatureType)}
    //       isStarting={selectedCreature.isStarting}
    //       isCreating={isCreatingUIState}
    //       showAnimation={showUnlockAnimation}
    //     />
    //     <img src={circleBackground} className="planet-scene-circle-background" />

    //     <MainMenuSelectingFrame
    //       order={currentProgramInfo.index}
    //       isReady={!isLoading && !selectedCreature.isStarting}
    //       isCurrentProgram={!isSelectingUIState}
    //       isStop={selectedCreature.isProgramStop}
    //     />
    //     {selectedCreaturePrograms.map((program, index) =>
    //       program == null ? (
    //         <MainMenuEmptyHint key={index} order={index} />
    //       ) : null
    //     )}
    //     {showUnlockAnimation && (
    //       <div className="planet-scene-bot-unlock-animation" />
    //     )}
    //     {showUpgradeAnimation && (
    //       <div className="planet-scene-bot-upgrade-animation" />
    //     )}
    //     <div className="planet-scene-menu-program-container">
    //       {selectedCreaturePrograms.map((program, index) => (
    //         <MainMenuProgram
    //           key={index}
    //           order={index}
    //           program={program}
    //           showContainerAnimation={isSelectingUIState}
    //           showProgramAnimation={
    //             !selectedCreature.isStarting &&
    //             !isSelectingUIState &&
    //             !isLoading &&
    //             uIState.type != UIStateType.UnlockPopup &&
    //             uIState.type != UIStateType.PlayUnlockAnimation &&
    //             currentProgramInfo.index == index &&
    //             !selectedCreature.isProgramStop
    //           }
    //         />
    //       ))}
    //     </div>
    //     <MainMenuWarning />
    //     {showConfirmButton && (
    //       <CreatureConfirmButton
    //         isDisabled={!enableConfirmButton}
    //         onClick={onClickConfirmReboot}
    //       />
    //     )}
    //     {showUnlockButton && (
    //       <CreatureUnlockButton
    //         isDisabled={!enableUnlockButton}
    //         onClick={() => onClickUnlock()}
    //       />
    //     )}
    //     {showRebootButton && (
    //       <CreatureRebootButton onClick={() => onClickReboot()} />
    //     )}
    //     {!isNotSelectingCreature && !isSelectingMarket && (
    //       <div className="planet-scene-redeem">
    //         <RedeemButton onClick={onClickRedeem} />
    //       </div>
    //     )}
    //   </div>
    // </div>
    <>
      <Rocket />
      <div className="planet-scene-container">
        <div className="planet-scene-canvas-container">
          <canvas id="canvas"></canvas>
        </div>
        <div className="planet-scene-program-container">
          {showConfirmCreateButton && (
            <div className="planet-scene-program-action-button">
              <CreatureConfirmButton
                isDisabled={!enableConfirmButton}
                onClick={onClickUnlock}
              />
            </div>
          )}
          {showConfirmRebootButton && (
            <div className="planet-scene-program-action-button">
              <CreatureConfirmButton
                isDisabled={!enableConfirmButton}
                onClick={onClickConfirmReboot}
              />
            </div>
          )}
          {showRebootButton && (
            <div className="planet-scene-program-action-button">
              <CreatureRebootButton
                isDisabled={isLoading}
                onClick={onClickReboot}
              />
            </div>
          )}
          {showNewCreatureButton && (
            <div className="planet-scene-program-action-button">
              <CreatureNewButton
                isDisabled={isLoading}
                onClick={onClickNewCreature}
              />
            </div>
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
                !isLoading &&
                uIState.type != UIStateType.UnlockPopup &&
                uIState.type != UIStateType.PlayUnlockAnimation &&
                currentProgramInfo.index == index &&
                !selectedCreature.isProgramStop
              }
            />
          ))}
        </div>
        <div className="planet-scene-creature-info">
          <Creature
            isLocked={false}
            creature={selectedCreature}
            progress={currentProgramInfo.progress}
          />
        </div>
        <div className="planet-scene-prev-creature-button">
          <PrevPageButton
            isDisabled={false}
            onClick={() => onChangeSelectedCreature(-1)}
          />
        </div>
        <div className="planet-scene-next-creature-button">
          <NextPageButton
            isDisabled={false}
            onClick={() => onChangeSelectedCreature(1)}
          />
        </div>
      </div>
    </>
  );
};

export default PlanetScene;
