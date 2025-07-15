import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./WelcomePage.css";
import background_back from "../../images/backgrounds/background_back.png";
import background_front from "../../images/backgrounds/background_front.png";
import sponsor_frame from "../../images/backgrounds/sponsor_frame.png";
import logo from "../../images/backgrounds/sponsor logo.png";
import PlayButton from "../../components/Buttons/PlayButton";
// import TemplateAdjustableImageTextButton from "../template/TemplateAdjustableImageTextButton";

interface Props {
  isLogin: boolean;
  onLogin: () => void;
  onStartGame: () => void;
}

const WelcomePage = ({ isLogin, onLogin, onStartGame }: Props) => {
  const dispatch = useAppDispatch();
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

  const adjustSize = () => {
    if (textRef.current) {
      const parentWidth = textRef.current.offsetWidth;
      setFontSize(parentWidth / 25);
    }
  };

  useEffect(() => {
    adjustSize();

    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, []);

  const onClickConnectWallet = () => {
    onLogin();
  };

  const onClickPlay = () => {
    onStartGame();
  };

  return (
    <div className="welcome-page-container">
      <img src={background_back} className="welcome-page-background-back" />
      <img src={sponsor_frame} className="welcome-page-sponsor-frame" />
      <img src={background_front} className="welcome-page-background-front" />
      <img src={logo} className="welcome-page-logo-image" />
      {isLogin ? (
        <div className="welcome-page-play-button">
          <PlayButton onClick={onClickPlay} />
        </div>
      ) : (
        <div className="welcome-page-connect-wallet-button">
          <PlayButton onClick={onClickConnectWallet} />
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
