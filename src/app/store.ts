import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import endpointReducer from "../data/endpoint";
import { createDelphinusStore } from "zkwasm-minirollup-browser";
import stateReducer from "../data/state";
import automataReducer from "../data/automata/automata";

export const store = createDelphinusStore({
  state: stateReducer,
  endpoint: endpointReducer,
  automata: automataReducer,
  additionalIgnoredPaths: ["endpoint.zkWasmServiceHelper"],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
