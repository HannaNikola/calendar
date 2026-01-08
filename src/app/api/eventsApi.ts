import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CalendarEvent } from "../types/typesApi";
import { toISOString } from "../shared/utils/date";
import { toast } from "sonner";
import { api } from "./api";

export const fetchEventsApi = createAsyncThunk(
  "allEvents/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/events");
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
      isImportant?: boolean;
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
      const response = await api.post("/api/events", payload);
      toast.success("Event was created successefully");
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

      const response = await api.patch(
        `/api/events/${payload.id}`,
        sanitizedEventData
      );
      toast.success("Event was update successefully", { duration: 1700 });
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
      const response = await api.delete(`/api/events/${id}`);
      toast.success("The event was delete successefully");
      return response.data.data._id;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);
