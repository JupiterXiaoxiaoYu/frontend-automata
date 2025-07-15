import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { queryState } from "../games/request";
import {
  ProgramModel,
  FilterModel,
  allResourcesToggleFilter,
  getResources,
  ResourceType,
  resourceTypes,
  ProgramType,
  getProgramName,
  decodePrograms,
} from "./models";

interface ProgramsState {
  programs: Array<ProgramModel>;
  filter: FilterModel;
  currentPage: number;
}

const initialState: ProgramsState = {
  programs: [],
  filter: allResourcesToggleFilter,
  currentPage: 0,
};

export const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    resetFilter: (state, action) => {
      state.currentPage = 0;
      state.filter = allResourcesToggleFilter;
    },
    toggleFilter: (state, action) => {
      state.currentPage = 0;
      const type = action.payload.type as ResourceType;
      state.filter.dict[type] = !(state.filter.dict[type] ?? true);
    },
    nextPage: (state, action) => {
      state.currentPage += 1;
    },
    prevPage: (state, action) => {
      state.currentPage = Math.max(0, state.currentPage - 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryState.fulfilled, (state, action) => {
      if (action.payload.player) {
        state.programs = decodePrograms(action.payload.player.data.cards);
      }
    });
  },
});

export const selectProgramsOnCurrentPage =
  (programs: ProgramModel[]) =>
  (amountPerPage: number) =>
  (state: RootState) => {
    const startIndex = state.programs.currentPage * amountPerPage - 1;
    const endIndex = startIndex + amountPerPage;
    return programs.slice(Math.max(startIndex, 0), endIndex);
  };

export const selectAllPrograms = (state: RootState) => state.programs.programs;

export const selectFilteredPrograms = (state: RootState) =>
  state.programs.programs.filter(
    (program: { resources: { type: ResourceType }[] }) =>
      selectIsAllResourcesToggled(state) ||
      resourceTypes.every(
        (type) =>
          !selectIsResourceTypeToggled(type)(state) ||
          program.resources.some(
            (resource: { type: ResourceType }) => resource.type === type
          )
      )
  );

export const selectProgramsByIndexes =
  (indexes: (number | null)[]) => (state: RootState) =>
    indexes.map((index) =>
      index != null && 0 <= index && index < state.programs.programs.length
        ? state.programs.programs[index]
        : null
    );
export const selectProgramByIndex =
  (index: number | null) => (state: RootState) =>
    index != null && 0 <= index && index < state.programs.programs.length
      ? state.programs.programs[index]
      : null;
export const selectIsAllResourcesToggled = (state: RootState) =>
  Object.values(state.programs.filter.dict).every((toggle) => !toggle);
export const selectIsResourceTypeToggled =
  (type: ResourceType) => (state: RootState) =>
    state.programs.filter.dict[type] ?? false;

export const selectCurrentPage = (state: RootState) =>
  state.programs.currentPage;
export const selectProgramCount = (state: RootState) =>
  state.programs.programs.length;

export const { resetFilter, toggleFilter, nextPage, prevPage } =
  programsSlice.actions;
export default programsSlice.reducer;
