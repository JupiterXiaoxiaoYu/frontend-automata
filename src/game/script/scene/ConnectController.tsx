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

const CREATE_PLAYER = 1n;

interface Props {
  imageUrls: string[];
  onStart: () => Promise<void>;
  onStartGameplay: () => void;
}

export function ConnectController({
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

  // RainbowKit connect modal hook
  const { openConnectModal } = useConnectModal();
  const showedModal = useRef(false);

  useEffect(() => {
    if (!isConnected && !showedModal.current) {
      showedModal.current = true;
      openConnectModal?.();
    }
  }, [isConnected, openConnectModal]);

  useEffect(() => {
    if (isConnected && !l1Account) {
      connectL1();
    }
  }, [isConnected, l1Account, connectL1]);

  const prevIsConnected = useRef(isConnected);

  // Show connect modal automatically on mount if wallet not connected
  useEffect(() => {
    if (prevIsConnected.current && !isConnected) {
      showedModal.current = false;
      openConnectModal?.();
    }
    prevIsConnected.current = isConnected;
  }, [l1Account, openConnectModal]);

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
    console.log("connectState", connectState);
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

  const onLogin = async () => {
    if (!queryingLogin) {
      await connectL2();
      setQueryingLogin(true);
    }
  };

  const onStartGame = () => {
    if (!l2Account) {
      return;
    }

    dispatch(queryState(l2Account!.getPrivateKey())).then(async (action) => {
      if (queryState.fulfilled.match(action)) {
        onStartGameplay();
        dispatch(setUIState({ uIState: { type: UIStateType.Idle } }));
      } else if (queryState.rejected.match(action)) {
        const command = createCommand(0n, CREATE_PLAYER, []);
        dispatch(
          sendTransaction({
            cmd: command,
            prikey: l2Account!.getPrivateKey(),
          })
        ).then(async (action) => {
          if (sendTransaction.fulfilled.match(action)) {
            dispatch(queryState(l2Account.getPrivateKey()));
            dispatch(setUIState({ uIState: { type: UIStateType.GuidePopup } }));
            dispatch(setTutorialType({ tutorialType: TutorialType.Creature }));
            dispatch(setSceneType({ sceneType: SceneType.None }));
            onStartGameplay();
          }
        });
      }
    });
  };

  if (connectState == ConnectState.Init) {
    return <LoadingPage message={"Initialising"} progress={0} />;
  } else if (connectState == ConnectState.OnStart) {
    return <LoadingPage message={"Starting"} progress={0} />;
  } else if (connectState == ConnectState.Preloading) {
    return <LoadingPage message={"Preloading Textures"} progress={progress} />;
  } else if (connectState == ConnectState.Idle) {
    return (
      <WelcomePage
        isLogin={l2Account != null}
        onLogin={onLogin}
        onStartGame={onStartGame}
      />
    );
  } else if (connectState == ConnectState.QueryConfig) {
    return <LoadingPage message={"Querying Config"} progress={0} />;
  } else if (connectState == ConnectState.QueryState) {
    return <LoadingPage message={"Querying State"} progress={0} />;
  } else if (connectState == ConnectState.ConnectionError) {
    return <LoadingPage message={"Error"} progress={0} />;
  } else {
    return <LoadingPage message={"Loading"} progress={0} />;
  }
}
