import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import creatureStopMask from "../images/backgrounds/creature_frame_stop_mask.png";
import creatureProgressMask from "../images/backgrounds/creature_frame_progress_mask.png";
import creatureSelectingFrame from "../images/backgrounds/robot_select.png";
import creatureLock from "../images/backgrounds/robot_lock.png";
import {
  TutorialType,
  UIState,
  selectTutorialType,
  setTutorialType,
  setUIState,
} from "../../data/automata/properties";
import {
  setSelectedCreatureIndex,
  selectSelectedCreatureListIndex,
  selectCreaturesCount,
  startCreatingCreature,
} from "../../data/automata/creatures";
import { selectIsLoading } from "../../data/automata/properties";
import { CreatureModel, getCreatureIconPath } from "../../data/automata/models";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreatureTutorial from "./CreatureTutorial";

interface Props {
  index: number;
  creature: CreatureModel;
  progress: number;
}

const Creature = ({ index, creature, progress }: Props) => {
  const dispatch = useAppDispatch();
  const selectedCreatureListIndex = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const isSelected = selectedCreatureListIndex == index;
  const isLoading = useAppSelector(selectIsLoading);
  const creaturesCount = useAppSelector(selectCreaturesCount);
  const isLocked = index >= creaturesCount;
  const showLocked = index > creaturesCount;
  const creatureIconPath = getCreatureIconPath(creature.creatureType);
  const tutorialType = useAppSelector(selectTutorialType);

  const onSelect = () => {
    if (!isSelected && !isLoading) {
      if (index == creaturesCount) {
        dispatch(
          startCreatingCreature({ creatureType: creature.creatureType })
        );
        dispatch(setUIState({ uIState: UIState.Creating }));
        if (tutorialType == TutorialType.Creature) {
          dispatch(setTutorialType({ tutorialType: TutorialType.Program }));
        }
      } else if (index < creaturesCount) {
        dispatch(setSelectedCreatureIndex({ index }));
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    }
  };

  const filterPercentage = 100 - progress;

  return (
    <div className="creature-container" onClick={() => onSelect()}>
      {index == 0 && <CreatureTutorial />}
      <img
        src={isSelected ? creatureSelectingFrame : creatureBackground}
        className="creature-background"
      />
      {creatureIconPath && (
        <>
          <img src={creatureIconPath} className="creature-image-background" />
          {isLocked && (
            <img src={creatureIconPath} className="creature-image" />
          )}

          {!isLocked && !creature.isProgramStop && (
            <img
              src={creatureProgressMask}
              className="creature-image-mask"
              style={{
                clipPath: `polygon(0 ${filterPercentage}%, 100% ${filterPercentage}%, 100% 100%, 0 100%)`,
              }}
            />
          )}

          {creature.isProgramStop && (
            <img src={creatureStopMask} className="creature-image-mask" />
          )}
        </>
      )}
      {creature.name === "Creating" ? (
        <p className="creature-creating-text">Creating</p>
      ) : (
        <p className="creature-text">{creature.name}</p>
      )}
      {showLocked && <img src={creatureLock} className="creature-lock-image" />}
    </div>
  );
};

export default Creature;
