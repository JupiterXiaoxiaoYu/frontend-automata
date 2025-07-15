import "./MainMenuEmptyHint.css";

interface Props {
  order: number;
}

const MainMenuEmptyHint = ({ order }: Props) => {
  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const radius = 30;
  const yPosition = 50 - Math.sin((angle * Math.PI) / 180) * radius;
  const xPosition = 50 + Math.cos((angle * Math.PI) / 180) * radius;

  return (
    <>
      <div
        className="main-menu-empty-hint-container"
        style={{
          top: `${yPosition}%`,
          left: `${xPosition}%`,
        }}
      >
        <p className="main-menu-empty-hint-text">Program Slot Not Selected</p>
      </div>
    </>
  );
};

export default MainMenuEmptyHint;
