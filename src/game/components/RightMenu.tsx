import React, { useEffect, useRef, useState } from "react";
import "./RightMenu.css";
import PageSelector from "./PageSelector";
import Grid from "./Grid";
import Program from "./Program";
import ProgramFilterBar from "./ProgramFilterBar";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectIsSelectingUIState,
  setUIState,
  TutorialType,
  setTutorialType,
  selectTutorialType,
  UIStateType,
} from "../../data/properties";
import { selectIsLoading } from "../../data/errors";
import {
  selectFilteredPrograms,
  selectProgramsOnCurrentPage,
  selectCurrentPage,
  prevPage,
  nextPage,
} from "../../data/programs";
import { setProgramIndex } from "../../data/creatures";
import NewProgram from "./NewProgram";

const RightMenu = () => {
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

  useEffect(() => {
    updateProgramGridHeight();
    window.addEventListener("resize", updateProgramGridHeight);
    return () => {
      window.removeEventListener("resize", updateProgramGridHeight);
    };
  }, []);

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

  const onClickPrevPageButton = () => {
    dispatch(prevPage({}));
  };

  const onClickNextPageButton = () => {
    dispatch(nextPage({}));
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

  return (
    <div className="right">
      <div ref={programGridRef} className="right-program-grid">
        <Grid
          elementWidth={programGridElementWidth}
          elementHeight={programGridElementHeight}
          columnCount={programGridColumnCount}
          rowCount={programGridRowCount}
          elements={programElements}
        />
      </div>
      {/* <div className="right-program-page-selector">
        <PageSelector
          currentPage={currentPage}
          pageCount={pageCount}
          isHorizontal={false}
          onClickPrevPageButton={onClickPrevPageButton}
          onClickNextPageButton={onClickNextPageButton}
        />
      </div> */}
    </div>
  );
};

export default RightMenu;
