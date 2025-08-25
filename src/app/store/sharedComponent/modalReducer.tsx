import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ModalState, ModalType, ModalMode } from "@/app/types/typesModal"


const initialState: ModalState = {
  isOpen: false,
  type: undefined,
  mode: undefined,
  selectedItem: null,
};

const modalElementSlice = createSlice({
  name: "modalElement",
  initialState,

  reducers: {
    openElementModal: (
      state,
      action: PayloadAction<{ type: ModalType; mode?: ModalMode; selectedItem?: any }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode; 
      state.selectedItem = action.payload.selectedItem ?? null;
    },
    closeElementModal: (state) => {
      state.isOpen = false;
      state.type = undefined;
      state.mode = undefined;
      state.selectedItem = null;
    },
  },
});

export const { openElementModal, closeElementModal } = modalElementSlice.actions;
export const modalReducer = modalElementSlice.reducer;
