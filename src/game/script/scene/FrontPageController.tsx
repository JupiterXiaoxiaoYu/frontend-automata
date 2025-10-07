import { useEffect, useRef, useState } from "react";
import {
  useWalletContext,
  ConnectState,
  useConnectModal,
} from "zkwasm-minirollup-browser";
import {
  getConfig,
  sendTransaction,
  queryState,
} from "zkwasm-minirollup-browser";
import { createCommand } from "zkwasm-minirollup-rpc";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectConnectState, setConnectState } from "../../../data/state";
import LoadingPage from "./LoadingPage";
import WelcomePage from "./WelcomePage";
import {
  SceneType,
  setSceneType,
  setTutorialType,
  setUIState,
  TutorialType,
  UIStateType,
} from "../../../data/properties";
import { pushError } from "../../../data/errors";

const CREATE_PLAYER = 1n;

interface Props {
  imageUrls: string[];
  onStart: () => Promise<void>;
  onStartGameplay: () => void;
}

export function FrontPageController({
  imageUrls,
  onStart,
  onStartGameplay,
}: Props) {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const {
    isConnected,
    isL2Connected,
    l1Account,
    l2Account,
    connectL1,
    connectL2,
    disconnect,
  } = useWalletContext();
  const connectState = useAppSelector(selectConnectState);
  const [queryingLogin, setQueryingLogin] = useState(false);
  const [isServerNoResponse, setIsServerNoResponse] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  // RainbowKit connect modal hook
  const { connectModalOpen, openConnectModal } = useConnectModal();

  console.log("connectModalOpen", connectModalOpen);

  useEffect(() => {
    if (isConnected) {
      connectL1();
      setAutoLogin(true);
    }
  }, [isConnected]);

  async function preloadImages(imageUrls: string[]): Promise<void> {
    let loadedCount = 0;
    const loadImage = (url: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.ceil((loadedCount / imageUrls.length) * 8000) / 100);
          resolve();
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
    };

    const promises = imageUrls.map((url) => loadImage(url));
    await Promise.all(promises);
  }

  const loadImages = async () => {
    try {
      await preloadImages(imageUrls);
      console.log(`${imageUrls.length} images loaded`);
    } catch (error) {
      console.error("Error loading images:", error);
      dispatch(pushError("Error loading images:" + String(error)));
    }
  };

  useEffect(() => {
    if (l1Account) {
      if (connectState == ConnectState.Init) {
        dispatch(setConnectState(ConnectState.OnStart));
      }
    }
  }, [l1Account]);

  useEffect(() => {
    if (connectModalOpen == false) {
      setQueryingLogin(false);
    }
  }, [connectModalOpen]);

  useEffect(() => {
    console.log("ConnectState", ConnectState[connectState]);
    if (connectState == ConnectState.OnStart) {
      onStart().then(() => {
        dispatch(setConnectState(ConnectState.Preloading));
      });
    } else if (connectState == ConnectState.Preloading) {
      loadImages().then(() => {
        dispatch(getConfig());
      });
    }
  }, [connectState]);

  const onClickConnectWallet = async () => {
    console.log("l1Account", l1Account);
    console.log("l2Account", l2Account);
    console.log(
      "openConnectModal",
      openConnectModal != undefined && openConnectModal != null
    );
    if (!queryingLogin && openConnectModal) {
      openConnectModal();
      setQueryingLogin(true);
    }
  };

  const onClickPlay = async () => {
    try {
      await connectL2();
    } catch (e) {
      console.error("connectL2 error", e);
      setAutoLogin(false);
      disconnect();
    }
  };

  useEffect(() => {
    if (!l2Account) {
      return;
    }

    dispatch(queryState(l2Account!.getPrivateKey())).then(async (action) => {
      if (queryState.fulfilled.match(action)) {
        onStartGameplay();
        dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
        console.error("start game query success");
      } else if (queryState.rejected.match(action)) {
        console.log("start game query failed", action.payload);
        const command = createCommand(0n, CREATE_PLAYER, []);
        dispatch(
          sendTransaction({
            cmd: command,
            prikey: l2Account!.getPrivateKey(),
          })
        ).then(async (action) => {
          if (
            sendTransaction.fulfilled.match(action) ||
            action.payload == "PlayerAlreadyExist"
          ) {
            dispatch(queryState(l2Account.getPrivateKey()));
            dispatch(setUIState({ uIState: { type: UIStateType.GuidePopup } }));
            dispatch(setTutorialType({ tutorialType: TutorialType.Creature }));
            dispatch(setSceneType({ sceneType: SceneType.None }));
            onStartGameplay();
          } else if (sendTransaction.rejected.match(action)) {
            const message = "start game Error: " + action.payload;
            console.error(message);
            dispatch(pushError(message));
            if (
              action.payload == "SendTransactionError AxiosError: Network Error"
            ) {
              setIsServerNoResponse(true);
            }
          }
        });
      }
    });
  }, [l2Account]);

  if (isServerNoResponse) {
    return <LoadingPage message={"Server No Response"} progress={0} />;
  } else if (connectState == ConnectState.Init) {
    return <LoadingPage message={"Initialising"} progress={0} />;
  } else if (connectState == ConnectState.OnStart) {
    return <LoadingPage message={"Starting"} progress={0} />;
  } else if (connectState == ConnectState.Preloading) {
    return <LoadingPage message={"Preloading Textures"} progress={progress} />;
  } else if (connectState == ConnectState.ConnectionError) {
    return <LoadingPage message={"Creating Player"} progress={0} />;
  } else if (
    connectState == ConnectState.Idle ||
    connectState == ConnectState.QueryConfig ||
    connectState == ConnectState.QueryState ||
    connectState == ConnectState.WaitingTxReply
  ) {
    return (
      <WelcomePage
        isLogin={l1Account != null}
        disabledLoginButton={autoLogin || queryingLogin}
        disabledPlayButton={false}
        onClickConnectWallet={onClickConnectWallet}
        onClickPlay={onClickPlay}
      />
    );
  } else {
    return <LoadingPage message={"Loading"} progress={0} />;
  }
}
