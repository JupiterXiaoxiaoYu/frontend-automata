import "./LoadingPage.css";
import background_back from "../../image/backgrounds/background_back.png";
import background_front from "../../image/backgrounds/background_front.png";
import sponsor_frame from "../../image/backgrounds/sponsor_frame.png";
import logo from "../../image/backgrounds/sponsor logo.png";
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
