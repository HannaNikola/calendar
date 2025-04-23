import { createSlice } from "@reduxjs/toolkit";
import { addEventApi, fetchEventsApi, deleteEventApi } from "@/app/api/eventsApi";
import {EventState} from "@/app/types/typesApi"




const initialState: EventState = {
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
      .addCase(deleteEventApi.pending, (state)=>{
        state.status = "loading";
      })
      // .addCase(deleteEventApi.fulfilled, (state, action)=>{
      //   state.status = "succeeded";
      //   state.events = state.events.filter(event => event.id !== action.payload);
      // })
      .addCase(deleteEventApi.fulfilled, (state, action)=>{
        state.status = "succeeded";
        state.events = state.events.filter(event => event._id !== action.payload);
      })
      .addCase(deleteEventApi.rejected, (state, action)=>{
       state.status = "failed"
       state.error = action.error.message || "Unknown error"; 
      })
  },
});

export const eventReducer = eventSlice.reducer;
