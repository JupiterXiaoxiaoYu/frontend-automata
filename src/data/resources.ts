import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { queryState } from "../games/request";
import {
  ResourceAmountPair,
  ResourceType,
  emptyResources,
  getResources,
} from "./models";

interface ResourcesState {
  resources: ResourceAmountPair[];
}

const initialState: ResourcesState = {
  resources: emptyResources,
};

export const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(queryState.fulfilled, (state, action) => {
      if (action.payload.player) {
        state.resources = getResources(action.payload.player.data.local);
      }
    });
  },
});

export const selectResources = (state: RootState) => state.resources.resources;
export const selectResource = (type: ResourceType) => (state: RootState) =>
  state.resources.resources.find(
    (resource: { type: ResourceType }) => resource.type == type
  )?.amount ?? 0;

// export const { } = resourcesSlice.actions;
export default resourcesSlice.reducer;
