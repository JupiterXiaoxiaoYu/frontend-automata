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
  useWalletContext,
} from "zkwasm-minirollup-browser/";
import { ConnectState } from "zkwasm-minirollup-browser";
import { ConnectController } from "./ConnectController";

export function LoadingController() {
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
      dispatch(queryState(l2AccountRef.current.getPrivateKey()));
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
    "../../images",
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
    return <Gameplay />;
  } else {
    return (
      <ConnectController
        imageUrls={imageUrls}
        onStart={onStart}
        onStartGameplay={onStartGameplay}
      />
    );
  }
}
