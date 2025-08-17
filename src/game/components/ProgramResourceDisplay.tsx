import React, { useEffect, useRef, useState } from "react";
import "./ProgramResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
  originalAmount?: number; // 原始资源数量（可选）
}

const ProgramResourceDisplay = ({
  iconImagePath,
  amount,
  originalAmount,
}: Props) => {
  const getSign = (number: number) => (number > 0 ? "+" : "");
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

  const adjustSize = () => {
    if (containerRef.current) {
      setFontSize(containerRef.current.offsetHeight / 2);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, [containerRef.current]);

  // 如果提供了原始数量且与调整后数量不同，则显示两个数量
  const showBothAmounts =
    originalAmount !== undefined && originalAmount !== amount;

  // 根据是否显示两个值来设置不同的容器类名
  const containerClassName = `program-resource-display-container${
    showBothAmounts ? " dual-values" : ""
  }`;

  return (
    <div className={containerClassName} ref={containerRef}>
      <img src={iconImagePath} className="program-resource-display-image" />
      <p
        className={
          amount == 0
            ? "program-resource-display-zero-text"
            : amount > 0
            ? "program-resource-display-positive-text"
            : "program-resource-display-negative-text"
        }
        style={{ fontSize }}
      >
        {showBothAmounts
          ? `${getSign(originalAmount!)}${originalAmount}→${getSign(
              amount
            )}${amount}`
          : `${getSign(amount)}${amount.toString()}`}
      </p>
    </div>
  );
};

export default ProgramResourceDisplay;
