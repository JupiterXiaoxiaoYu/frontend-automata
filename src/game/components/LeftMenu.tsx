import React, { useEffect, useRef, useState } from "react";
import leftCornerBar from "../image/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import PageSelector from "./PageSelector";
import Grid from "./Grid";
import Creature from "./Creature";
import { selectIsLoading } from "../../data/errors";
import { setProgramIndex } from "../../data/creatures";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProgramFilterBar from "./ProgramFilterBar";
import {
  selectFilteredPrograms,
  selectProgramsOnCurrentPage,
  selectCurrentPage,
  nextPage,
  prevPage,
} from "../../data/programs";
import NewProgram from "./NewProgram";
import Program from "./Program";
import {
  TutorialType,
  setTutorialType,
  setUIState,
  UIStateType,
  selectIsSelectingUIState,
  selectTutorialType,
} from "../../data/properties";

const LeftMenu = () => {
  const dispatch = useAppDispatch();
  const [programGridHeight, setProgramGridHeight] = useState(0);
  const programGridRef = useRef<HTMLInputElement>(null);
  const updateProgramGridHeight = () => {
    if (programGridRef.current) {
      setProgramGridHeight(programGridRef.current.offsetHeight);
    }
  };
  const programGridElementWidth = 170;
  const programGridElementHeight = 95;
  const programGridColumnCount = 1;
  const programGridRowCount = Math.floor(
    programGridHeight / programGridElementHeight
  );
  const amountPerPage = programGridColumnCount * programGridRowCount;
  const currentPage = useAppSelector(selectCurrentPage);
  const programsBeforePaging = useAppSelector(selectFilteredPrograms);
  const programs = useAppSelector(
    selectProgramsOnCurrentPage(programsBeforePaging)(amountPerPage)
  );
  const pageCount = Math.max(
    Math.ceil((programsBeforePaging.length + 1) / amountPerPage),
    1
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isLoading = useAppSelector(selectIsLoading);
  const tutorialType = useAppSelector(selectTutorialType);

  const onSelectProgram = (programIndex: number) => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setProgramIndex({ programIndex }));

      if (tutorialType == TutorialType.Program) {
        dispatch(setTutorialType({ tutorialType: TutorialType.None }));
      }
    }
  };

  const onClickNewProgram = () => {
    if (!isLoading) {
      dispatch(setUIState({ uIState: { type: UIStateType.NewProgramPopup } }));
    }
  };

  const programElements =
    currentPage == 0
      ? [
          <NewProgram key={-1} onSelect={onClickNewProgram} />,
          ...programs.map((program, index) => (
            <Program
              key={index}
              index={index}
              program={program}
              isDisabled={program.marketId > 0}
              onSelect={() => onSelectProgram(program.index)}
            />
          )),
        ]
      : programs.map((program, index) => (
          <Program
            key={index}
            index={index}
            program={program}
            isDisabled={program.marketId > 0}
            onSelect={() => onSelectProgram(program.index)}
          />
        ));

  const onClickPrevPageButton = () => {
    if (!isLoading) {
      dispatch(prevPage({}));
    }
  };

  const onClickNextPageButton = () => {
    if (!isLoading) {
      dispatch(nextPage({}));
    }
  };

  useEffect(() => {
    updateProgramGridHeight();
    window.addEventListener("resize", updateProgramGridHeight);
    return () => {
      window.removeEventListener("resize", updateProgramGridHeight);
    };
  }, []);

  return (
    <div className="left">
      <div className="left-top"></div>
      <div className="left-middle"></div>
      <div className="left-bottom"></div>

      <div ref={programGridRef} className="left-creature-grid">
        <Grid
          elementWidth={programGridElementWidth}
          elementHeight={programGridElementHeight}
          columnCount={programGridColumnCount}
          rowCount={programGridRowCount}
          elements={programElements}
        />
      </div>

      <img src={leftCornerBar} className="left-corner-bar" />
      <div className="left-program-filter-bar-position">
        <ProgramFilterBar />
      </div>
      <div className="left-creature-page-selector">
        <PageSelector
          currentPage={currentPage}
          pageCount={pageCount}
          isHorizontal={false}
          onClickPrevPageButton={onClickPrevPageButton}
          onClickNextPageButton={onClickNextPageButton}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
