import { createSlice } from "@reduxjs/toolkit";
import {
  addEventApi,
  fetchEventsApi,
  deleteEventApi,
  updateEventApi,
} from "@/app/api/eventsApi";
import { EventStateProps } from "@/app/types/typesApi";
import { fetchDeletedUser, fetchLogoutUser } from "@/app/api/authApi";

const initialState: EventStateProps = {
  events: [],
  status: "idle",
  error: null,
};

const eventSlice = createSlice({
  name: "eventData",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventsApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEventsApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(addEventApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEventApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = [...state.events, action.payload];
      })
      .addCase(addEventApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateEventApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEventApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = state.events.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateEventApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(deleteEventApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEventApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = state.events.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteEventApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(fetchLogoutUser.fulfilled, () => initialState)
      .addCase(fetchDeletedUser.fulfilled, ()=> initialState)
  },
});

export const eventReducer = eventSlice.reducer;
