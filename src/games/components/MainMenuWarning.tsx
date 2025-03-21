import React from "react";
import "./MainMenuWarning.css";
import { UIState, selectUIState } from "../../data/automata/properties";
import {
  selectIsNotSelectingCreature,
  selectSelectedCreatureListIndex,
  selectSelectedCreaturePrograms,
} from "../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const MainMenuWarning = () => {
  const uIState = useAppSelector(selectUIState);
  const selectedCreatureListIndex = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const notSelectingCreature = useAppSelector(selectIsNotSelectingCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const emptySlotCount = selectedCreaturePrograms.filter(
    (program) => program === null
  ).length;
  const notFillInAllSlots =
    (uIState == UIState.Creating || uIState == UIState.Reboot) &&
    emptySlotCount > 0;

  const isLoading = uIState == UIState.Loading;
  return (
    <div className="main-menu-warning-container">
      <p className="main-menu-energy-text">
        Consume {selectedCreatureListIndex + 1} enery every cycle
      </p>
      {notSelectingCreature && (
        <p className="main-menu-warning-text">Select a creature to continue</p>
      )}
      {notFillInAllSlots && (
        <p className="main-menu-warning-text">
          {8 - emptySlotCount} out of 8 slots are installed
        </p>
      )}
      {isLoading && <p className="main-menu-warning-text">Loading...</p>}
    </div>
  );
};

export default MainMenuWarning;
