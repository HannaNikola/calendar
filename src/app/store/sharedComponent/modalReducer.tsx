import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ModalState, ModalType, ModalMode } from "@/app/types/typesModal"




const initialState: ModalState = {
  isOpen: false,
  type: undefined,
  mode: undefined,
  selectedId: null
};

const modalElementSlice = createSlice({
  name: "modalElement",
  initialState,

  reducers: {
    openElementModal: (
      state,
      action: PayloadAction<{ type: ModalType; mode?: ModalMode; selectedId?: string }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode; 
      state.selectedId = action.payload.selectedId ?? null;
    },
    closeElementModal: (state) => {
      state.isOpen = false;
      state.type = undefined;
      state.mode = undefined;
      state.selectedId = null;
    },
  },
});

export const { openElementModal, closeElementModal } = modalElementSlice.actions;
export const modalReducer = modalElementSlice.reducer;

