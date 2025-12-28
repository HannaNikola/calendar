import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ModalState, ModalPayload } from "@/app/types/typesModal";

const initialState: ModalState = {
  isOpen: false,
  type: null,
  mode: null,
  data: null,
};
const modalElementSlice = createSlice({
  name: "modalElement",
  initialState,

  reducers: {
    openElementModal: (state, action: PayloadAction<ModalPayload>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode ?? null;
      state.data = action.payload.data ?? null;
    },
    closeElementModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.mode = null;
      state.data = null;
    },
  },
});

export const { openElementModal, closeElementModal } =
  modalElementSlice.actions;
export const modalReducer = modalElementSlice.reducer;
