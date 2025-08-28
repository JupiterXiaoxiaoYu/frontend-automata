import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import endpointReducer from "../data/endpoint";
import { createDelphinusStore } from "zkwasm-minirollup-browser";
import stateReducer from "../data/state";
import errorsReducer from "../data/errors";
import resourcesReducer from "../data/resources";
import propertiesReducer from "../data/properties";
import creaturesReducer from "../data/creatures";
import programsReducer from "../data/programs";
import guidesReducer from "../data/guides";
import marketReducer from "../data/market";
import { accountSliceReducer } from "zkwasm-minirollup-browser/dist/store";

export const store = createDelphinusStore(
  {
    state: stateReducer,
    errors: errorsReducer,
    endpoint: endpointReducer,
    resources: resourcesReducer,
    properties: propertiesReducer,
    creatures: creaturesReducer,
    programs: programsReducer,
    guides: guidesReducer,
    market: marketReducer,
  },
  [],
  [],
  ["endpoint.zkWasmServiceHelper", "state.lastError.payload"],
  []
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
