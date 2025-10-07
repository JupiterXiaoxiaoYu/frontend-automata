import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectConnectState,
  selectNullableConfig,
  selectNullableUserState,
} from "../../../data/state";
import Gameplay from "../../components/Gameplay";
import {
  queryInitialState,
  queryState,
  sendTransaction,
  useWalletContext,
} from "zkwasm-minirollup-browser/";
import { ConnectState } from "zkwasm-minirollup-browser";
import { FrontPageController } from "./FrontPageController";
import { setUIState, UIStateType } from "../../../data/properties";
import { createCommand } from "zkwasm-minirollup-rpc";
import { selectError } from "../../../data/errors";
import ErrorPopup from "../../components/Popups/ErrorPopup";

const CREATE_PLAYER = 1n;

export function InitController() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectNullableUserState);
  const config = useAppSelector(selectNullableConfig);
  const connectState = useAppSelector(selectConnectState);
  const connectStateRef = useRef(connectState);
  const userStateRef = useRef(userState);
  const [inc, setInc] = useState(0);
  const [startGameplay, setStartGameplay] = useState(false);
  const { l2Account } = useWalletContext();
  const l2AccountRef = useRef(l2Account);
  const error = useAppSelector(selectError);

  // update State
  function updateState() {
    if (
      connectStateRef.current == ConnectState.Init &&
      userStateRef.current == null
    ) {
      dispatch(queryInitialState("1"));
    } else if (
      connectStateRef.current == ConnectState.Idle &&
      l2AccountRef.current != null
    ) {
      dispatch(queryState(l2AccountRef.current.getPrivateKey())).then(
        (action) => {
          if (queryState.fulfilled.match(action)) {
            console.log("initial queryState success");
          } else {
            console.log("initial queryState failed");
            const command = createCommand(0n, CREATE_PLAYER, []);
            dispatch(
              sendTransaction({
                cmd: command,
                prikey: l2AccountRef.current.getPrivateKey(),
              })
            );
          }
        }
      );
    }
    setInc(inc + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  useEffect(() => {
    connectStateRef.current = connectState;
  }, [connectState]);

  useEffect(() => {
    userStateRef.current = userState;
  }, [userState]);

  useEffect(() => {
    l2AccountRef.current = l2Account;
  }, [l2Account]);

  const requireContext = require.context(
    "../../image",
    true,
    /\.(png|jpg|jpeg|gif)$/
  );
  const imageUrls = requireContext.keys().map(requireContext) as string[];

  const onStart = async () => {
    /* */
  };

  const onStartGameplay = () => {
    setStartGameplay(true);
  };

  console.log(
    "Testing Login",
    config,
    userState?.player,
    userState?.player ? Object.keys(userState.player!).length : 0,
    startGameplay
  );

  if (
    config &&
    userState?.player &&
    Object.keys(userState.player!).length > 0 &&
    startGameplay
  ) {
    return (
      <>
        <Gameplay />
        {error && <ErrorPopup message={error} />}
      </>
    );
  } else {
    return (
      <>
        <FrontPageController
          imageUrls={imageUrls}
          onStart={onStart}
          onStartGameplay={onStartGameplay}
        />
        {error && <ErrorPopup message={error} />}
      </>
    );
  }
}
