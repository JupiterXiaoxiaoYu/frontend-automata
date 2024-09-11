import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/request";
import { ResourceAmountPair, ResourceType, emptyResources, getResources } from './models';

interface ResourcesState {
    resources: ResourceAmountPair[];
}

const initialState: ResourcesState = {
    resources: emptyResources,
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            state.resources = getResources(action.payload.player);
        });
    }
  },
);

export const selectResources = (type: ResourceType) => (state: RootState) => state.automata.resources.resources.find(resource => resource.type == type)?.amount ?? 0;
    
// export const { } = resourcesSlice.actions;
export default resourcesSlice.reducer;