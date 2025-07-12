import "./LoadingPage.css";
import background_back from "../../images/backgrounds/background_back.png";
import background_front from "../../images/backgrounds/background_front.png";
import sponsor_frame from "../../images/backgrounds/sponsor_frame.png";
import logo from "../../images/backgrounds/sponsor logo.png";
import WelcomePageProgressBar from "../../components/WelcomePageProgressBar";

interface Props {
  message: string;
  progress: number;
}

const LoadingPage = ({ message, progress }: Props) => {
  return (
    <div className="loading-page-connecting-container">
      <img src={background_back} className="loading-page-background-back" />
      <img src={sponsor_frame} className="loading-page-sponsor-frame" />
      <img src={background_front} className="loading-page-background-front" />
      <img src={logo} className="loading-page-logo-image" />
      {progress == 0 && (
        <>
          <div className="loading-page-background-filter"></div>
          <WelcomePageProgressBar progress={progress} message={message} />
        </>
      )}
    </div>
  );
};

export default LoadingPage;
