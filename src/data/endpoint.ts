import { ZkWasmServiceHelper } from "zkwasm-service-helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../app/store";

export const resturl = "https://rpc.zkwasmhub.com:8090";
export const zkwasmHelper = new ZkWasmServiceHelper(resturl, "", "");
export interface Endpoint {
  url: string;
  nickname: string;
}

export const storageKey = "customURLs";
export const defaultEndpoint: Endpoint = {
  url: resturl,
  nickname: "Default",
};
function customEndpoints() {
  //Get custom endpoint array from local storage
  const endpoints = localStorage.getItem(storageKey);
  if (endpoints) {
    return JSON.parse(endpoints) as Endpoint[];
  }
  return [];
}

function getLastUsedEndpoint() {
  const endpoint = localStorage.getItem("lastUsedEndpoint");
  if (endpoint) {
    console.log("last used endpoint: " + endpoint + "");
    return JSON.parse(endpoint) as Endpoint;
  }
  return defaultEndpoint;
}

const initialState: {
  currentEndpoint: Endpoint;
  endpointList: Endpoint[];
} = {
  currentEndpoint: getLastUsedEndpoint(),
  endpointList: [...customEndpoints()],
};

export const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
  reducers: {
    updateCurrentEndpoint: (state, d: PayloadAction<Endpoint>) => {
      //add updated array to local storage
      localStorage.setItem("lastUsedEndpoint", JSON.stringify(d.payload));
      state.currentEndpoint = d.payload;
    },
    setEndpointList: (state, d) => {
      //add updated array to local storage
      localStorage.setItem(storageKey, JSON.stringify(d.payload));
      state.endpointList = d.payload;
    },
  },
});

export const { updateCurrentEndpoint, setEndpointList } = endpointSlice.actions;

export const selectEndpointList = (state: RootState) =>
  state.endpoint.endpointList;
export const selectCurrentEndpoint = (state: RootState) =>
  state.endpoint.currentEndpoint;

// Create a helper function that creates a new ZkWasmServiceHelper when needed
export const createZkWasmServiceHelper = (endpoint?: Endpoint) => {
  const currentEndpoint = endpoint || getLastUsedEndpoint();
  return new ZkWasmServiceHelper(currentEndpoint.url, "", "");
};

export default endpointSlice.reducer;
