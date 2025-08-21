import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "event" | "todo";
export type ModalMode = "new" | "update";

interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  mode?: ModalMode;
  selectedItem: any | null;
}

const initialState: ModalState = {
  isOpen: false,
  type: undefined,
  mode:undefined,
  selectedItem: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; mode: ModalMode; selectedItem?: any }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode;
      state.selectedItem = action.payload.selectedItem ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = undefined;
      state.mode = undefined;
      state.selectedItem = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;


