import React, { useState, useEffect, useRef } from "react";
import GainCommonResource from "./GainCommonResource";
import SpendCommonResource from "./SpendCommonResource";
import {
  commonResourceTypes,
  rareResourceTypes,
  ResourceAmountPair,
  emptyCommonResources,
  ProgramInfo,
  ResourceType,
} from "../../../data/automata/models";
import { selectIsSelectingUIState } from "../../../data/automata/properties";
import {
  selectSelectedCreatureIndex,
  selectSelectedCreatureCurrentProgram,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./ResourceAnimations.css";
import GainTitaniumResource from "./GainTitaniumResource";

interface Props {
  localTimer: number;
}

const ResourceAnimations = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const selectedCreatureIndex = useAppSelector(selectSelectedCreatureIndex);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [gainAnimations, setGainAnimations] = useState<GainAnimationProps[]>(
    []
  );
  const [spendAnimations, setSpendAnimations] = useState<SpendAnimationProps[]>(
    []
  );
  const [gainTitaniumAnimationDelayTime, setGainTitaniumAnimationDelayTime] =
    useState<number>(0);

  interface GainAnimationProps {
    entity: ResourceAmountPair;
    delayTime: number;
    centerPosition: { x: number; y: number };
    splashEndPosition: { x: number; y: number };
    resourceDisplayerPosition: { x: number; y: number };
  }

  interface SpendAnimationProps {
    entity: ResourceAmountPair;
    delayTime: number;
    startPosition: { x: number; y: number };
    endPosition: { x: number; y: number };
  }

  const getCenterPosition = (parentContainer: HTMLDivElement) => {
    return {
      x: parentContainer.clientWidth / 2,
      y: parentContainer.clientHeight / 2,
    };
  };

  const getSplashEndPosition =
    (parentContainer: HTMLDivElement) => (type: ResourceType) => {
      const centerPosition = getCenterPosition(parentContainer);
      const resourceDisplayerPosition = getResourceDisplayerPosition(type);
      const vector = {
        x: centerPosition.x - resourceDisplayerPosition.x,
        y: centerPosition.y - resourceDisplayerPosition.y,
      };
      const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      return {
        x: parentContainer.clientWidth / 2 + (vector.x / length) * 25,
        y: parentContainer.clientHeight / 2 + (vector.y / length) * 25,
      };
    };

  const getResourceDisplayerPosition = (type: ResourceType) => {
    const commonResourceIndex = commonResourceTypes.findIndex((t) => t == type);
    const rareResourceIndex = rareResourceTypes.findIndex((t) => t == type);

    return commonResourceIndex != -1
      ? {
          x: 90 * commonResourceIndex + 30,
          y: 25,
        }
      : {
          x: 80 * rareResourceIndex + 272,
          y: 70,
        };
  };

  const triggerAnimation = (diffResources: ResourceAmountPair[]) => {
    const parentContainer = parentRef.current;
    if (parentContainer && !playingAnimation) {
      setAnimationIndex(animationIndex + 1);
      setPlayingAnimation(true);

      const delayTimePerItem = 250;
      const gainResources = diffResources.filter((pair) => pair.amount > 0);
      const gainResourcesWithoutTitanium = diffResources.filter(
        (pair) => pair.amount > 0 && pair.type != ResourceType.Titanium
      );
      const spendResources = diffResources.filter((pair) => pair.amount < 0);
      const isGainingTitanium =
        gainResources.filter((pair) => pair.type == ResourceType.Titanium)
          .length > 0;

      const gainAnimationsValue = gainResourcesWithoutTitanium.map(
        (pair, index) => ({
          entity: pair,
          delayTime: index * delayTimePerItem,
          centerPosition: getCenterPosition(parentRef.current!),
          splashEndPosition: getSplashEndPosition(parentRef.current!)(
            pair.type
          ),
          resourceDisplayerPosition: getResourceDisplayerPosition(pair.type),
        })
      );
      const spendAnimationsValue = spendResources.map((pair, index) => ({
        entity: pair,
        delayTime:
          (index + gainResources.length + (isGainingTitanium ? 3 : 0) + 1) *
          delayTimePerItem,
        startPosition: getResourceDisplayerPosition(pair.type),
        endPosition: getCenterPosition(parentRef.current!),
      }));

      if (isGainingTitanium) {
        gainAnimationsValue.push({
          entity: gainResources.filter(
            (pair) => pair.type == ResourceType.Titanium
          )[0],
          delayTime: (gainResources.length + 2) * delayTimePerItem,
          centerPosition: getCenterPosition(parentRef.current!),
          splashEndPosition: getSplashEndPosition(parentRef.current!)(
            ResourceType.Titanium
          ),
          resourceDisplayerPosition: getResourceDisplayerPosition(
            ResourceType.Titanium
          ),
        });
      }

      setGainAnimations(gainAnimationsValue);
      setSpendAnimations(spendAnimationsValue);
      setGainTitaniumAnimationDelayTime(
        isGainingTitanium
          ? gainResourcesWithoutTitanium.length * delayTimePerItem
          : 0
      );

      setTimeout(() => {
        setPlayingAnimation(false);
      }, (gainResourcesWithoutTitanium.length + (isGainingTitanium ? 3 : 0) + spendResources.length + 2) * delayTimePerItem + 1000);
    }
  };

  const currentProgramInfo = useAppSelector(
    selectSelectedCreatureCurrentProgram(localTimer)
  );

  const [lastProgramInfo, setLastProgramInfo] = useState(currentProgramInfo);
  const [lastSelectedCreatureIndex, setLastSelectedCreatureIndex] = useState(
    selectedCreatureIndex
  );

  if (
    !isSelectingUIState &&
    selectedCreatureIndex == lastSelectedCreatureIndex &&
    lastProgramInfo.index != currentProgramInfo.index
  ) {
    setLastProgramInfo(currentProgramInfo);
    triggerAnimation(lastProgramInfo.program?.resources ?? []);
  }

  useEffect(() => {
    setLastSelectedCreatureIndex(selectedCreatureIndex);
    setLastProgramInfo(currentProgramInfo);
  }, [selectedCreatureIndex]);

  return (
    <div ref={parentRef} className="resource-animations-container">
      {playingAnimation &&
        gainAnimations.map((prop, index) => (
          <GainCommonResource
            key={index}
            type={prop.entity.type}
            animationIndex={animationIndex}
            delayTime={prop.delayTime}
            centerPosition={prop.centerPosition}
            splashEndPosition={prop.splashEndPosition}
            resourceDisplayerPosition={prop.resourceDisplayerPosition}
            changeAmount={prop.entity.amount}
          />
        ))}
      {playingAnimation &&
        spendAnimations.map((prop, index) => (
          <SpendCommonResource
            key={index}
            type={prop.entity.type}
            animationIndex={animationIndex}
            delayTime={prop.delayTime}
            startPosition={prop.startPosition}
            endPosition={prop.endPosition}
            changeAmount={prop.entity.amount}
          />
        ))}
      {gainTitaniumAnimationDelayTime && (
        <GainTitaniumResource
          animationIndex={animationIndex}
          delayTime={gainTitaniumAnimationDelayTime}
        />
      )}
    </div>
  );
};

export default ResourceAnimations;
