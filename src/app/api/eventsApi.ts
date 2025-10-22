import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CalendarEvent } from "../types/typesApi";
import { toISOString } from "../utils/date";

axios.defaults.baseURL = "https://calendar-back-end-s3b2.onrender.com";






export const fetchEventsApi = createAsyncThunk(
  "allEvents/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/events");
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const addEventApi = createAsyncThunk(
  "eventsData/addEvent",
  async (
    newEvent: {
      title: string;
      description?: string;
      start?: Date | string | null;
      end?: Date | string | null;
      allDay?: boolean;
      addTask?: boolean;
      isCompletedTask?: boolean;
      isImportant?:boolean;
      todoId?: string | null;
      colorEvent?: "none" | "home" | "work" | "isektor";
      repeat?: "none" | "daily" | "workday" | "weekend";
      reminder?: {
        triggerBefore?: "30min" | "1hour" | "1day" | "none";
        notifyAt?: Date | null;
        notified?: boolean;
      };
    },
    thunkAPI
  ) => {
    try {
      const payload = {
        ...newEvent,
        start: toISOString(newEvent.start),
        end: toISOString(newEvent.end),
        allDay: Boolean(newEvent.allDay),

        addTask: newEvent.addTask,
      };
      const response = await axios.post("/api/events", payload);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const updateEventApi = createAsyncThunk(
  "eventsData/updateEvent",
  async (payload: { id: string; eventData: CalendarEvent }, thunkApi) => {
    try {
      const { _id, ...sanitizedEventData } = payload.eventData;

      const response = await axios.patch(
        `/api/events/${payload.id}`,
        sanitizedEventData
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const deleteEventApi = createAsyncThunk<string, string>(
  "eventsData/deleteEvent",
  async (id: string, thunkApi) => {
    try {
      const response = await axios.delete(`/api/events/${id}`);
      return response.data.data._id;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);







