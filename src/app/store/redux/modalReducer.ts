import { CalendarEvent } from "@/app/types/typesApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalStateProps } from "@/app/types/typesModal";

const initialState: ModalStateProps = {
  isModalOpen: false,
  modalType: undefined,
  selectedEvent: null,
  slotStart: null,
  slotEnd: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        type: "new" | "update";
        selectedEvent?: CalendarEvent | null;
        slotStart?: Date | null;
        slotEnd?: Date | null;
      }>
    ) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedEvent = action.payload.selectedEvent ?? null;
      state.slotStart = action.payload.slotStart ?? null;
      state.slotEnd = action.payload.slotEnd ?? null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = undefined;
      state.selectedEvent = null;
      state.slotStart = null;
      state.slotEnd = null;
    },
  },
});
export const { closeModal, openModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
