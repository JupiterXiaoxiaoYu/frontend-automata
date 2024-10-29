import React from "react";
import "./WelcomePage.css";
import PlayButton from "./Buttons/PlayButton";
import WelcomePageProgressBar from "./WelcomePageProgressBar";
import logo from "../images/backgrounds/sponsor logo.png";

interface Props {
  progress: number;
  message: string;
  onClick: () => void;
}

const WelcomePage = ({ progress, message, onClick }: Props) => {
  return (
    <div className="welcome-page-container">
      <div className="welcome-page-background"></div>
      <img src={logo} className="welcome-page-logo-image" />
      <div className="welcome-page-play-button">
        <PlayButton onClick={onClick} />
      </div>
      {progress > 0 ? (
        <>
          <div className="welcome-page-background-filter"></div>
          <WelcomePageProgressBar progress={progress} message={message} />
        </>
      ) : null}
    </div>
  );
};

export default WelcomePage;
