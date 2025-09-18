import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedItem = { _id: string; title: string } | null;

type FilterState = {
  query: string;
  entity: "event" | "todo" | null;
  isFocused: boolean;
  selectedItem: { _id: string; title: string } | null;
};

const initialState: FilterState = {
  query: "",
  entity: null,
  isFocused: false,
  selectedItem: null,
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setFilterEntity(state, action: PayloadAction<"event" | "todo" | null>) {
      state.entity = action.payload;
      state.selectedItem = null;
    },
    setSelectedItem(state, action: PayloadAction<SelectedItem>) {
      state.selectedItem = action.payload;
      state.query = action.payload ? action.payload.title : "";
      state.isFocused = false;
    },
    clearFilter(state) {
      state.query = "";
      state.entity = null;
      state.isFocused = false;
      state.selectedItem = null;
    },
    setFilterFocus(state, action: PayloadAction<boolean>) {
      state.isFocused = action.payload;
    },
  },
});
export const {
  setFilterEntity,
  setSelectedItem,
  setFilterQuery,
  clearFilter,
  setFilterFocus,
} = FilterSlice.actions;
export const filterReduser = FilterSlice.reducer;
