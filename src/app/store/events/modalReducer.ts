import { CalendarEvent } from "@/app/types/typesApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalStateProps } from "@/app/types/typesModal";
import { toISOString } from "@/app/utils/date";

const initialState: ModalStateProps = {
  isModalOpen: false,
  modalType: undefined,
  selectedEvent: null,
  slotStart: null,
  slotEnd: null,
  addTask: false,
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
        slotStart?: Date | string | null;
        slotEnd?: Date | string | null;
        addTask: boolean;
      }>
    ) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedEvent = action.payload.selectedEvent ?? null;
      state.slotStart = toISOString(action.payload.slotStart ?? null);
      state.slotEnd = toISOString(action.payload.slotEnd ?? null);
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
