import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectConnectState,
  selectNullableConfig,
  selectNullableUserState,
} from "../../../data/state";
import Gameplay from "../../components/Gameplay";
import { queryInitialState } from "zkwasm-minirollup-browser/";
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

  // update State
  function updateState() {
    if (
      connectStateRef.current == ConnectState.Init &&
      userStateRef.current == null
    ) {
      dispatch(queryInitialState("1"));
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
