import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./WelcomePage.css";
import background_back from "../../image/backgrounds/background_back.png";
import background_front from "../../image/backgrounds/background_front.png";
import sponsor_frame from "../../image/backgrounds/sponsor_frame.png";
import logo from "../../image/backgrounds/sponsor logo.png";
import WelcomeConnectWalletButton from "../button/WelcomeConnectWalletButton";
import WelcomePlayButton from "../button/WelcomePlayButton";
import { selectServerVersion } from "../../../data/properties";
// import TemplateAdjustableImageTextButton from "../template/TemplateAdjustableImageTextButton";

interface Props {
  isLogin: boolean;
  onLogin: () => void;
  onStartGame: () => void;
}

const WelcomePage = ({ isLogin, onLogin, onStartGame }: Props) => {
  const dispatch = useAppDispatch();
  const serverVersion = useAppSelector(selectServerVersion);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);

  const adjustSize = () => {
    if (textRef.current) {
      const parentWidth = textRef.current.offsetWidth;
      setFontSize(parentWidth / 150);
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
    <div className="welcome-page-container" ref={textRef}>
      <img src={background_back} className="welcome-page-background-back" />
      {/* <img src={sponsor_frame} className="welcome-page-sponsor-frame" /> */}
      <img src={background_front} className="welcome-page-background-front" />
      <iframe
        className="welcome-page-youtube-iframe-container"
        src="https://www.youtube.com/embed/M7UVw9KtcB0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <img src={logo} className="welcome-page-logo-image" />
      <p
        className="welcome-page-server-version-text"
        style={{ fontSize: fontSize }}
      >
        {`Server Version: ${serverVersion}`}
      </p>
      {isLogin ? (
        <div className="welcome-page-play-button">
          <WelcomePlayButton onClick={onClickPlay} isDisabled={false} />
        </div>
      ) : (
        <div className="welcome-page-connect-wallet-button">
          <WelcomeConnectWalletButton
            onClick={onClickConnectWallet}
            isDisabled={false}
          />
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
