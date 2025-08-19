import "./Creature.css";
import creatureBackground from "../image/backgrounds/creature_frame.png";
import creatureStopMask from "../image/backgrounds/creature_frame_stop_mask.png";
import creatureProgressMask from "../image/backgrounds/creature_frame_progress_mask.png";
import { UIStateType, setUIState } from "../../data/properties";
import { selectCreaturesCount } from "../../data/creatures";
import { selectIsLoading } from "../../data/errors";
import {
  AttributeType,
  CreatureModel,
  getAttributeIconPath,
  getCreatureIconPath,
} from "../../data/models";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UpgradeButton from "./Buttons/UpgradeButton";
import { useRef, useState, useEffect } from "react";

interface Props {
  isLocked: boolean;
  creature: CreatureModel;
  progress: number;
}

const Creature = ({ isLocked, creature, progress }: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const creaturesCount = useAppSelector(selectCreaturesCount);
  const creatureIconPath = getCreatureIconPath(creature.creatureType);
  const levelIcon = getAttributeIconPath(AttributeType.Level);
  const speedIcon = getAttributeIconPath(AttributeType.Speed);
  const efficiencyIcon = getAttributeIconPath(AttributeType.Efficiency);
  const productivityIcon = getAttributeIconPath(AttributeType.Productivity);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nameFontSize, setNameFontSize] = useState<number>(0);
  const [valueFontSize, setValueFontSize] = useState<number>(0);

  const adjustSize = () => {
    if (containerRef.current) {
      setNameFontSize(containerRef.current.offsetHeight / 8);
      setValueFontSize(containerRef.current.offsetHeight / 10);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [containerRef.current, containerRef.current?.offsetHeight]);

  function onClickUpgrade() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.UpgradePopup } }));
    }
  }

  const filterPercentage = 100 - progress;

  return (
    <div className="creature-container" ref={containerRef}>
      <img src={creatureBackground} className="creature-background" />
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
      <img src={levelIcon} className="creature-level-icon" />
      <div className="creature-upgrade-button">
        <UpgradeButton isDisabled={isLocked} onClick={onClickUpgrade} />
      </div>
      <img src={speedIcon} className="creature-speed-icon" />
      <img src={efficiencyIcon} className="creature-efficiency-icon" />
      <img src={productivityIcon} className="creature-productivity-icon" />
      <p className="creature-level-text" style={{ fontSize: valueFontSize }}>
        {
          creature.attributes.find((pair) => pair.type == AttributeType.Level)
            ?.amount
        }
      </p>
      <p className="creature-speed-text" style={{ fontSize: valueFontSize }}>
        {
          creature.attributes.find((pair) => pair.type == AttributeType.Speed)
            ?.amount
        }
      </p>
      <p
        className="creature-efficiency-text"
        style={{ fontSize: valueFontSize }}
      >
        {
          creature.attributes.find(
            (pair) => pair.type == AttributeType.Efficiency
          )?.amount
        }
      </p>
      <p
        className="creature-productivity-text"
        style={{ fontSize: valueFontSize }}
      >
        {
          creature.attributes.find(
            (pair) => pair.type == AttributeType.Productivity
          )?.amount
        }
      </p>
      {creature.name === "Creating" ? (
        <p
          className="creature-creating-text"
          style={{ fontSize: valueFontSize }}
        >
          Creating
        </p>
      ) : (
        <p className="creature-text" style={{ fontSize: nameFontSize }}>
          {creature.name}
        </p>
      )}
    </div>
  );
};

export default Creature;
