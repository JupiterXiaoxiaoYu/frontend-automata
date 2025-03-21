import React from "react";
import "./WelcomePage.css";
import PlayButton from "./Buttons/PlayButton";
import WelcomePageProgressBar from "./WelcomePageProgressBar";
import background_back from "../images/backgrounds/background_back.png";
import background_front from "../images/backgrounds/background_front.png";
import sponsor_frame from "../images/backgrounds/sponsor_frame.png";
import logo from "../images/backgrounds/sponsor logo.png";

interface Props {
  progress: number;
  message: string;
  onClick: () => void;
}

const WelcomePage = ({ progress, message, onClick }: Props) => {
  return (
    <div className="welcome-page-container">
      <img src={background_back} className="welcome-page-background-back" />
      <img src={sponsor_frame} className="welcome-page-sponsor-frame" />
      <img src={background_front} className="welcome-page-background-front" />
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
