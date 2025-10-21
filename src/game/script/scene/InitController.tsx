import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectConnectState,
  selectNullableConfig,
  selectNullableUserState,
  setConnectState,
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
  const [startGameplay, setStartGameplay] = useState(false);
  const { l2Account } = useWalletContext();
  const l2AccountRef = useRef(l2Account);
  const error = useAppSelector(selectError);

  useEffect(() => {
    let isCancelled = false;

    async function updateState() {
      try {
        if (
          connectStateRef.current === ConnectState.OnStart &&
          userStateRef.current == null
        ) {
          await dispatch(queryInitialState("1"));
        } else if (
          connectStateRef.current === ConnectState.Idle &&
          l2AccountRef.current != null
        ) {
          await dispatch(queryState(l2AccountRef.current.getPrivateKey()));
        }
      } catch (err) {
        console.warn("query_state failed:", err);
      } finally {
        if (!isCancelled) {
          setTimeout(updateState, 5000);
        }
      }
    }

    updateState();
    return () => {
      isCancelled = true;
    };
  }, []);

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
