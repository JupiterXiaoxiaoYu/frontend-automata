import React, { useEffect, useRef, useState } from "react";
import number_display from "../image/backgrounds/number_display.png";
import PrevPageButton from "./Buttons/PrevPageButton";
import NextPageButton from "./Buttons/NextPageButton";
import "./PageSelector.css";

interface Props {
  currentPage: number;
  pageCount: number;
  isHorizontal: boolean;
  onClickPrevPageButton: () => void;
  onClickNextPageButton: () => void;
}

const PageSelector = ({
  currentPage,
  pageCount,
  isHorizontal,
  onClickPrevPageButton,
  onClickNextPageButton,
}: Props) => {
  const enableNextPageButton = currentPage < pageCount - 1;
  const enablePrevPageButton = currentPage > 0;
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

  const adjustSize = () => {
    if (containerRef.current) {
      setFontSize(containerRef.current.offsetHeight / 3.5);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [containerRef.current, containerRef.current?.offsetHeight]);

  return (
    <div className="page-selector-container" ref={containerRef}>
      <div
        className={
          isHorizontal
            ? "page-selector-prev-button-horizontal"
            : "page-selector-prev-button"
        }
      >
        <PrevPageButton
          isDisabled={!enablePrevPageButton}
          onClick={onClickPrevPageButton}
        />
      </div>
      <img
        src={number_display}
        className={`page-selector-page-number-background`}
      ></img>

      <p
        className={`page-selector-page-number-text`}
        style={{ fontSize: fontSize }}
      >{`${currentPage + 1}/${pageCount}`}</p>
      <div
        className={
          isHorizontal
            ? "page-selector-next-button-horizontal"
            : "page-selector-next-button"
        }
      >
        <NextPageButton
          isDisabled={!enableNextPageButton}
          onClick={onClickNextPageButton}
        />
      </div>
    </div>
  );
};

export default PageSelector;
