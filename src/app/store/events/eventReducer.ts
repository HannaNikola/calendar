import { createSlice } from "@reduxjs/toolkit";
import {
  addEventApi,
  fetchEventsApi,
  deleteEventApi,
  updateEventApi,
} from "@/app/api/eventsApi";
import { completedTodoApi, updateTodotApi } from "@/app/api/todoApi";
import { EventStateProps } from "@/app/types/typesApi";
import { fetchDeletedUser, fetchLogoutUser } from "@/app/api/authApi";
import { deleteTodoApi } from "@/app/api/todoApi";

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
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(updateEventApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateTodotApi.fulfilled, (state, action) => {
        const todo = action.payload;

        if (!todo.eventId) return;
        state.events = state.events.map((event) =>
          event._id === todo.eventId
            ? {
                ...event,
                title: todo.title,
                description: todo.description,
              }
            : event,
        );
      })
      .addCase(completedTodoApi.fulfilled, (state, action) => {
        const todo = action.payload;

        if (!todo.eventId) return;

        state.events = state.events.map((event) =>
          event._id === todo.eventId
            ? {
                ...event,
                isCompletedTask: todo.isCompletedTask,
                addTask: todo.isCompletedTask ? false : event.addTask,
                description: todo.isCompletedTask ? "" : event.description,
              }
            : event,
        );
      })
      .addCase(deleteEventApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEventApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = state.events.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(deleteEventApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(fetchLogoutUser.fulfilled, () => initialState)
      .addCase(fetchDeletedUser.fulfilled, () => initialState)
      .addCase(deleteTodoApi.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { eventId } = action.payload;

        if (!eventId) return;

        state.events = state.events.map((event) =>
          event._id === eventId
            ? {
                ...event,
                todoId: null,
                addTask: false,
                description: "",
                isCompletedTask: false,
              }
            : event,
        );
      });
  },
});

export const eventReducer = eventSlice.reducer;
