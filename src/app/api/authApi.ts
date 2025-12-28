import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://calendar-back-end-s3b2.onrender.com";

export const registerApi = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string; name: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/register", data);
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const loginApi = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

// export const fetchCurrentUser = createAsyncThunk(
//   "auth/current",
//   async (_, thunkAPI) => {
//     const res = await fetch("/api/users/current", {
//       credentials: "include",
//     });

//     if (!res.ok) throw new Error("Not authenticated");
//     return res.json();
//   }
// );
