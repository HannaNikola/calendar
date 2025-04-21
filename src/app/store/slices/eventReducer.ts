import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://calendar-back-end-s3b2.onrender.com";

export const fetchEventsApi = createAsyncThunk(
  "allEvents/fetchAll",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/events");
      console.log("response", response.data);

       return response.data;

      } catch (error) {
      const err = error as AxiosError;
      console.error("Fetch error:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const addEventApi = createAsyncThunk(
  "eventItem/addEvent",
  async (newEvent:{ title: string; start: Date; end: Date; allDay: boolean; addTask: boolean }, thunkAPI) => {
    try {
      const payload = {
        ...newEvent,
        start: newEvent.start.toISOString(),
        end: newEvent.end.toISOString(),
      };
      const response = await axios.post("/api/events", newEvent);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Fetch error:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  addTask: boolean;
}

interface EventState {
  events: CalendarEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
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
      });
  },
});

export const eventReducer = eventSlice.reducer;
