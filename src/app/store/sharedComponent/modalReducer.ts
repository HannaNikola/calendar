import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ModalState,
  ModalType,
  ModalMode,
  ModalData,
} from "@/app/types/typesModal";

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
    openElementModal: (
      state,
      action: PayloadAction<{
        type: ModalType;
        mode?: ModalMode;
        data?: ModalData;
      }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode ?? "new";
      state.data = action.payload.data ?? null;
    },
    closeElementModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.mode = null;
      state.data = null;
    },
    // updateModalData: (state, action: PayloadAction<Partial<ModalData>>) => {
    //       state.data = { ...state.data, ...action.payload };
    //     },
    //   },
  },
});

export const { openElementModal, closeElementModal } =
  modalElementSlice.actions;
export const modalReducer = modalElementSlice.reducer;
